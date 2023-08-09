import { type Request } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';

export type RequestAndUser = Request & { user: UserDocument };
