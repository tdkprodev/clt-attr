import * as joi from "joi";
import { path, omit } from "ramda";

import { handleEndpoint, router } from "@api/index";
import { UserRepository } from "@server/repository"; // for querying user(s)
import { User } from "@server/model";
import { config } from "@shared/config";
import { Logger } from "@shared/logger";
import { login, signup } from "@api/user/user-client";
import { hash } from "bcryptjs";

/** Instantiate and initialize Logger */
const log = new Logger("api/user");
log.info("Logger initialized");

/* AUTH -- IMPLEMENT LATER */

/** CRUD
 *
 * createUserEndpoint
 * removeUserEndpoint
 * listUserEndpoint
 * saveUserEndpoint
 */

/**
 * create is the create endpoint that will be used to get data from to fabricate
 * the enpoint for express routing to listen for.
 *
 * The async function is the callback that will be invoked if/when permisions and
 * joi validation have passed validity. This function is where you want to CRUD.
 */
export const loginEndPoint = handleEndpoint(login, async body => {
  const user = (await User.find({ email: body.email })) as any;
  if (!user) {
    return {
      success: false,
      code: "NOT_FOUND"
    };
  }

  if (await user.checkPassword(body.password)) {
    return {
      success: true,
      token: user.generateToken(),
      user
    };
  }
  return { success: false, code: "INVALID_PASSWORD" };
});

export const signupEndpoint = handleEndpoint(signup, async body => {
  const validation = joi.validate(
    body,
    joi.object().keys({
      email: joi
        .string()
        .email()
        .required(),
      firstName: joi.string(),
      lastName: joi.string(),
      password: joi.string().required(),

      verification: joi.strip(),
      verified: joi.boolean()
    })
  );

  if (validation.error) {
    return {
      success: false,
      code: path(["error", "details", 0, "message"], validation) as string
    };
  }

  if (!body.email) {
    return {
      success: false,
      code: "EMAIL_MISSING"
    };
  }

  const existingUser = await User.find({ email: body.email });
  if (existingUser.length) {
    console.log('existinguser is ', existingUser);
    return {
      success: false,
      code: "EMAIL_EXISTS"
    };
  }

  const user = new User();
  validation.value.password = await hash(
    body.password as string,
    config.PASSWORD_SALT
  );

  User.merge(user, validation.value);

  const newUser = await user.save();

  return {
    success: true,
    token: newUser.generateToken(),
    user: omit(["password", "verification"], newUser)
  };
});
