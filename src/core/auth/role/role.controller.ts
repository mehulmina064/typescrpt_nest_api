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
import { RoleDto } from './role.dto';
import { RoleService } from './role.service';
import { ParseFilterPipe } from '../../../common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanStateMachine } from '@can/state-machine';
import { CanPermissions } from '@can/common';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @CanPermissions({ or: ['CREATE_ROLE'] })
  async create(@Body(ValidationPipe) roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  }

  @Get()
  @CanPermissions({ or: ['READ_ROLE'] })
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.roleService.findAll(filter);
  }

  @Get('count')
  @CanPermissions({ or: ['READ_ROLE'] })
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.roleService.count(filter);
  }

  @Get(':id')
  @CanPermissions({ or: ['READ_ROLE'] })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findById(id);
  }

  @Patch(':id')
  @CanPermissions({ or: ['UPDATE_ROLE'] })
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true })) roleDto: RoleDto,
  ) {
    return this.roleService.updateById(id, roleDto);
  }
}
