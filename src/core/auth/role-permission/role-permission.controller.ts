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
import { RolePermissionsDto } from './role-permission.dto';
import { RolePermissionService } from './role-permission.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('role-permission')
export class RolePermissionController {
  constructor(private rolePermissionsService: RolePermissionService) {}

  @Post()
  async create(@Body(ValidationPipe) rolePermissionsDto: RolePermissionsDto) {
    return this.rolePermissionsService.create(rolePermissionsDto);
  }

  @Get('mapped-roles')
  async findUserRoles(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.rolePermissionsService.findUserRoles(filter);
  }

  @Post('mapping')
  async mapping(@Body(ValidationPipe) rolePermissionsDto: RolePermissionsDto) {
    return this.rolePermissionsService.mapping(rolePermissionsDto);
  }

  @Patch('mapp-permission/:id')
  async updateMapping(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    rolePermissionsDto: RolePermissionsDto,
  ) {
    return this.rolePermissionsService.updateMapping(id, rolePermissionsDto);
  }

  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.rolePermissionsService.findAll(filter);
  }

  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.rolePermissionsService.count(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionsService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    rolePermissionsDto: RolePermissionsDto,
  ) {
    return this.rolePermissionsService.updateById(id, rolePermissionsDto);
  }
}
