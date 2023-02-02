import { CanStateConfig } from '@can/state-machine';
import { User } from './user.model';

export class UserStateMachine {
  constructor() {}

  static getConfig(): CanStateConfig {
    return {
      name: 'UserModel',
      model: User,
      changes: [
        {
          key: 'status',
          value: 'pending',
          to: [
            {
              value: 'approved',
              before: [],
              after: [],
            },
            {
              value: 'rejected',
              before: [],
              after: [],
            },
          ],
        },

        // {
        //   key: 'name',
        //   value: 'Shibu Shrivastva',
        //   to: {
        //     value: 'Shibu',
        //     before: [
        //       () => this.displayName('Shibu'),
        //       () => this.displayName('Shibu'),
        //     ],
        //     after: [
        //       () => this.displayName('Shibu'),
        //       () => this.displayName('Shibu'),
        //     ],
        //   },
        // },
      ],
    };
  }

  static displayName(name: string) {}
}
