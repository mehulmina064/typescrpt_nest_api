import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CanContextService } from '../services/context/context.service';
import { CanCurrentUser } from '../types/current-user.type';
import { CAN_PERMISSIONS_CONFIG } from './permissions.constant';
import { CanPermissionsConfig } from './permissions.type';

@Injectable()
export class CanPermissionsService {
  validatePermission(
    currentUser: CanCurrentUser,
    requiredPermissions: CanPermissionsConfig,
  ): boolean {
    if (!currentUser) {
      return false;
    }
    let isValid = true;

    /**
     * OR Condition Validation
     */
    if (
      requiredPermissions &&
      requiredPermissions.or &&
      requiredPermissions.or.length &&
      !requiredPermissions.and
    ) {
      isValid = this.validateOrCondition(
        requiredPermissions.or,
        currentUser.permissions,
      );
    }

    /**
     * AND Condition Validation
     */
    if (
      requiredPermissions &&
      requiredPermissions.and &&
      requiredPermissions.and.length &&
      !requiredPermissions.or
    ) {
      isValid = this.validateAndCondition(
        requiredPermissions.and,
        currentUser.permissions,
      );
    }

    /**
     * AND & OR Condition Validation
     */
    if (
      requiredPermissions &&
      requiredPermissions.or &&
      requiredPermissions.or.length &&
      requiredPermissions.and &&
      requiredPermissions.and.length
    ) {
      const isValidOr = this.validateAndCondition(
        requiredPermissions.or,
        currentUser.permissions,
      );
      const isValidAnd = this.validateAndCondition(
        requiredPermissions.and,
        currentUser.permissions,
      );
      isValid = isValidOr && isValidAnd;
    }

    return isValid;
  }

  extractPermissions(context: ExecutionContext): CanPermissionsConfig {
    const reflector = CanContextService.getAppContext().get(Reflector);
    return reflector.get<CanPermissionsConfig>(
      CAN_PERMISSIONS_CONFIG,
      context.getHandler(),
    );
  }

  extractRolesAndPermissions(context: ExecutionContext): CanCurrentUser {
    const request = context.switchToHttp().getRequest();
    const currentUser: CanCurrentUser = request.user;
    if (!currentUser) {
      return null;
    }
    return currentUser;
  }

  private validateOrCondition(
    requiredPermissions: string[],
    userPermissions: string[],
  ) {
    let isValid = true;
    for (let i = 0; i < requiredPermissions.length; i++) {
      const permissionRegex = new RegExp(
        `^${requiredPermissions[i].trim()}$`,
        'i',
      );
      const foundPermission = userPermissions.find(permission =>
        permission.trim().match(permissionRegex),
      );
      if (foundPermission) {
        isValid = true;
        break;
      }
      if (i === requiredPermissions.length - 1) {
        isValid = false;
      }
    }
    return isValid;
  }

  private validateAndCondition(
    requiredPermissions: string[],
    userPermissions: string[],
  ) {
    let isValid = true;
    for (let i = 0; i < requiredPermissions.length; i++) {
      const permissionRegex = new RegExp(
        `^${requiredPermissions[i].trim()}$`,
        'i',
      );
      let foundPermission = userPermissions.find(permission =>
        permission.trim().match(permissionRegex),
      );
      if (!foundPermission) {
        isValid = false;
        break;
      } else {
        isValid = true;
      }
    }
    return isValid;
  }
}
