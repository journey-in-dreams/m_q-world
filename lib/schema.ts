import * as authTables from '@/schema/auth-tables';
import * as users from '@/schema/users';

export const schema = {
  ...users,
  ...authTables,
};
