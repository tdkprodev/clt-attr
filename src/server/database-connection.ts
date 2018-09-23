/** Import and create a new instance of the DatabaseConnection class
 * 
 */
import { config } from '@shared/config';
import { DatabaseConnection } from '@shared/connections/database';
import { Logger } from '@shared/logger';

/** Instantiate and initialize Logger */
const log = new Logger('somename-database');
log.info('Logger initialized');

const { DATABASE_URL } = config;

const conn = new DatabaseConnection(
  {
    url: DATABASE_URL,
  },
  log,
);

if (process.argv.indexOf('--no-db') !== -1) {
  log.info('Found flag--no-db, so not connecting to the database');
} else {
  conn.connect();
}

export const db = conn.connection;


