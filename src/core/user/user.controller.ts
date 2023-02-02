import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { ParseFilterPipe } from '../../common/pipes/parse-filter.pipe';
import { CountOptions, FindOptions } from 'sequelize';
import { CanPermissions, CurrentUser } from '@can/common';
import { CanCurrentUser } from '@can/common/types/current-user.type';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  // @CanPermissions({ or: ['CREATE_USER'] })
  async create(@Body(ValidationPipe) userDto: UserDto) {
    return this.userService.create(userDto);
  }


  @Get('/validate')
  async validate(@CurrentUser() user: CanCurrentUser) {
    const mappedUser = { ...user };
    const permissions: any = {};
    mappedUser.permissions.forEach(
      permission => (permissions[permission] = true),
    );
    mappedUser['userId'] = mappedUser['user_id'];
    mappedUser['userName'] = mappedUser['user_name'];
    mappedUser.permissions = permissions;
    delete mappedUser['user_id'];
    delete mappedUser['user_name'];
    return mappedUser;
  }

  @Get()
  // @CanPermissions({ or: ['READ_USER'] })
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.userService.findAll(filter);
  }

  @Get('count')
  // @CanPermissions({ or: ['READ_USER'] })
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.userService.count(filter);
  }

  @Get(':id')
  // @CanPermissions({ or: ['READ_USER'] })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  // @CanPermissions({ or: ['UPDATE_USER'] })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    userDto: Partial<UserDto>,
  ) {
    return this.userService.updateById(id, userDto);
  }
}
