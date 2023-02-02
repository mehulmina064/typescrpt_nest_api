import { CanNotificationOptions } from '@can/notification';
import { AWS_CONFIG } from './aws.config';
import { EMAIL_API_CONFIG } from './email.config';
import { SMS_API_CONFIG } from './sms.config';

export const NOTIFICATION_CONFIG: CanNotificationOptions[] = [
  // Add notification config here

  {
    category: 'orders',
    items: [
      {
        trigger: {
          name: 'ORDER_STATUS',
        },
        data: {
          title: `# {{order_id}} status!`,
          order_id: '',
          status: '',
          body: '',
        },
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order with No. {{oderId}} is {{status}} state`,
                title: `Order Status`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order with No. {{oderId}} is {{status}} state`,
                title: `Order Status`,
              },
            },
          },
        },
      },

      {
        trigger: {
          name: 'ORDER_CREATED',
        },
        data: {
          title: `Your order with #{{order_id}} number is placed!`,
          order_id: '',
          status: '',
          body: '',
        },
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order with #{{order_id}} number is placed!`,
                title: `Order placed`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order with #{{order_id}} number is placed!`,
                title: `Order placed`,
              },
            },
          },
        },
      }
    ],
  },

  {
    category: 'consultation',
    items: [
      {
        trigger: {
          name: 'BOOKING_RECEIVED'
        },
        data: {
          name: '',
          firstName:'',
          lastName:'',
          date: '',
          time: '',
          body: `Your consultation request has been received. We'll share the booking confirmation soon.`,
          title: `Booking received`,
           is_digital_opd:'true',
          is_active: 'true'
        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, your online/offline consultation request has been received for {{date}} at {{time}}. We'll share the booking confirmation soon. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your consultation request has been received. We'll share the booking confirmation soon.`,
                title: `Booking acceptance`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your consultation request has been received. We'll share the booking confirmation soon.`,
                title: `Booking received`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'We got your request You asked for an appointment, and we’re on it!',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_ACCEPTANCE'
        },
        data: {
          name: '',
          date: '',
          firstName:'',
          lastName:'',
          time: '',
          body: `Your consultation request has been accepted. We'll share the booking confirmation soon.`,
          title: `Booking acceptance`,
           is_digital_opd:'true',
          is_active: 'true',
          type:'',
        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, your {{type}} consultation request has been accepted for {{date}} at {{time}}. We'll share the booking confirmation soon. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your consultation request has been accepted. We'll share the booking confirmation soon.`,
                title: `Booking acceptance`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your consultation request has been accepted. We'll share the booking confirmation soon.`,
                title: `Booking acceptance`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'We got your request You asked for an appointment, and we’re on it!',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_CONFIRMATION'
        },
        data: {
          body: `Thanks! We've got your payment, and confirmed your consultation.`,
          title: `Booking confirmation`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Template already given`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Thanks! We've got your payment, and confirmed your consultation.`,
                title: `Booking confirmation`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Thanks! We've got your payment, and confirmed your consultation.`,
                title: `Booking confirmation`,
                 is_digital_opd:'true',
                is_active: 'true'
              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Template already given',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PAYMENT_FOR_BOOKING'
        },
        data: {
          name: '',
          body: `Just click here to make your payment and confirm your consultation!`,
          title: `Payment for booking`,
          link: '',
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}} , to complete the booking of your consultation, just click here {{link}} to make your payment. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Just click here to make your payment and confirm your consultation!`,
                title: `Payment for booking
                `,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Just click here to make your payment and confirm your consultation!`,
                title: `Payment for booking
                `,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Subject line: The payment link for your consultation',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_COMPLETION'
        },
        data: {
          name: '',
          body: `Your online/offline consultation  booking is complete!`,
          title: `Booking completion`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          type:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, your {{type}} consultation booking is complete. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your online/offline consultation  booking is complete!`,
                title: `Booking completion`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your online/offline consultation  booking is complete!`,
                title: `Booking completion
                `,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Subject line: Your appointment is confirmed',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PRESCRIPTION_AVAILABILITY'
        },
        data: {
          name: '',
          body: `Hello, we need your Doctor's prescription to confirm your appointment. Just click here to share it.`,
          title: `Prescription availability `,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          link:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, to confirm your consultation, we need your Doctor's prescription. To share it with us, please click here {{link}}. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Hello, we need your Doctor's prescription to confirm your appointment. Just click here to share it.`,
                title: `Prescription availability `,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Hello, we need your Doctor's prescription to confirm your appointment. Just click here to share it.`,
                title: `Prescription availability
                `,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Subject line: Can we have your prescription, please?',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_CONFIRMATION'
        },
        data: {
          body: `Good news. Your offline/online consultation booking is confirmed! `,
          title: `Booking confirmation`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Template already given `,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Good news. Your offline/online consultation booking is confirmed! `,
                title: `Booking confirmation`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Good news. Your offline/online consultation booking is confirmed! `,
                title: `Booking confirmation`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Template already given ',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'RESCHEDULE'
        },
        data: {
          body: `The change is done! Your consultation appointment has been rescheduled.`,
          title: `Reschedule`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Template already given`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `The change is done! Your consultation appointment has been rescheduled.`,
                title: `Reschedule`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `The change is done! Your consultation appointment has been rescheduled.`,
                title: `Reschedule`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Template already given',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'CANCELLATION_REFUND'
        },
        data: {
          name: '',
          body: `Your consultation has been cancelled. The payment you've made will be refunded soon.`,
          title: `Cancellation & Refund`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          type:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, you had booked an {{type}} consultation at a discount, using your Edelweiss Digital OPD Policy, and you later decided to cancel. Your appointment has been cancelled, and the money will be refunded to your account within 4-5 working days. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your consultation has been cancelled. The payment you've made will be refunded soon.`,
                title: `Cancellation & Refund`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your consultation has been cancelled. The payment you've made will be refunded soon.`,
                title: `Cancellation & Refund`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Subject line: Your booking has been cancelled',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'INVOICE_GENERATED'
        },
        data: {
          body: `Invoice for your booking has been generated.`,
          title: `Invoice Generated`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Invoice for your booking has been generated.`,
                title: `Invoice Generated`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Invoice for your booking has been generated.`,
                title: `Invoice Generated`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'PAYMENT_COMPLETED'
        },
        data: {
          body: `Your payment is completed for the booking.`,
          title: `Thank you!`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your payment is completed for the booking.`,
                title: `Thank you!`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your payment is completed for the booking.`,
                title: `Thank you!`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'BOOKING_MODIFICATION'
        },
        data: {
          body: `Hello, there is change in your booking. Click here to review.`,
          title: `Change in booking.`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Hello, there is change in your booking. Click here to review.`,
                title: `Change in booking.`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Hello, there is change in your booking. Click here to review.`,
                title: `Change in booking.`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
    ]
  },

  {
    category: 'medicine',
    items: [
      {
        trigger: {
          name: 'ORDER_RECEIVED'
        },
        data: {
          name: '',
          body: `Your order for medicines has been received, and will be confirmed soon.`,
          title: `Order received`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've received your online order for medicines, and will share the order confirmation soon. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order for medicines has been received, and will be confirmed soon.`,
                title: `Order received`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order for medicines has been received, and will be confirmed soon.`,
                title: `Order received`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Subject line: Your medicine order has been received',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_ACCEPTANCE'
        },
        data: {
          name: '',
          body: `Your order for medicines has been accepted, and will be confirmed soon.`,
          title: `Order acceptance`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've accepted your online order for medicines, and will share the order confirmation soon. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order for medicines has been accepted, and will be confirmed soon.`,
                title: `Order acceptance`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order for medicines has been accepted, and will be confirmed soon.`,
                title: `Order acceptance`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject:
              'Subject line: Your medicine order has been accepted',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_MODIFICATION'
        },
        data: {
          name: '',
          body: `Wanted a change in your order for medicines? We've taken care of it!`,
          title: `Order modification`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, you wanted a change in your order for medicines, and we have accepted the change. We'll send you the confirmation shortly. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Wanted a change in your order for medicines? We've taken care of it!`,
                title: `Order modification`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Wanted a change in your order for medicines? We've taken care of it!`,
                title: `Order modification`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your change in order has been accepted.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_CANCELLATION'
        },
        data: {
          body: `Your order for medicines has been cancelled. The refund will show up in your account soon.`,
          title: `Order cancellation`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, You had ordered medicines online using the discount benefit of your Edelweiss Digital OPD Policy, and later decided to cancel the order. Your order has been cancelled, and the money will be refunded to your account within 4-5 working days. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order for medicines has been cancelled. The refund will show up in your account soon.`,
                title: `Order cancellation`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order for medicines has been cancelled. The refund will show up in your account soon.`,
                title: `Order cancellation`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Template already given',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_CONFIRMATION'
        },
        data: {
          body: `Your order for medicines has been confirmed. You'll get your meds soon!`,
          title: `Order confirmation`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Template already given`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order for medicines has been confirmed. You'll get your meds soon!`,
                title: `Order confirmation`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order for medicines has been confirmed. You'll get your meds soon!`,
                title: `Order confirmation`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Template already given',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PAYMENT_FOR_ORDER'
        },
        data: {
          name: '',
          body: `Just click here to make payment and complete your order for medicines!`,
          title: `Payment for Order`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, to pay and complete your order for medicines, click here {#var#}. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI.`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Just click here to make payment and complete your order for medicines!`,
                title: `Payment for Order`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Just click here to make payment and complete your order for medicines!`,
                title: `Payment for Order`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: The payment link for your medicine order',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_DISPATCHED'
        },
        data: {
          name: '',
          order_id: '',
          body: `Woohoo! Your medicine order is on its way.`,
          title: `Order dispatched`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've sent your Order No {{order_id}} you'll get it soon. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Woohoo! Your medicine order is on its way.`,
                title: `Order dispatched`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Woohoo! Your medicine order is on its way.`,
                title: `Order dispatched`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: We’ve sent your medicines.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'ORDER_DILIVERED'
        },
        data: {
          name: '',
          body: `Your order is delivered! Hope you've got it.`,
          title: `Order Delivered`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, this is just to confirm that your medicines have been delivered to you. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order is delivered! Hope you've got it.`,
                title: `Order Delivered`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order is delivered! Hope you've got it.`,
                title: `Order Delivered`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your medicines have been delivered',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'CANCELLATION_REFUND'
        },
        data: {
          name: '',
          body: `Your order for medicines has been cancelled. The refund will come to you soon.`,
          title: `Cancellation & Refund`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, you've asked us to cancel the order for medicines that you placed through your Edelweiss Digital OPD Policy. Your order has been cancelled, and the money will be refunded to your account within 4-5 working days. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your order for medicines has been cancelled. The refund will come to you soon.`,
                title: `Cancellation & Refund`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your order for medicines has been cancelled. The refund will come to you soon.`,
                title: `Cancellation & Refund`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your order for medicines has been cancelled.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'INVOICE_GENERATED'
        },
        data: {
          body: `Invoice for your order has been generated.`,
          title: `Invoice Generated`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, to pay and complete your order for medicines, click here {#var#}. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI.`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Invoice for your order has been generated.`,
                title: `Invoice Generated`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Invoice for your order has been generated.`,
                title: `Invoice Generated`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'PAYMENT_COMPLETED'
        },
        data: {
          body: `Your payment is completed for the order.`,
          title: `Thank you!`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your payment is completed for the order.`,
                title: `Thank you!`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your payment is completed for the order.`,
                title: `Thank you!`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'ORDER_MODIFICATION'
        },
        data: {
          body: `Hello, there is modification in your order. Click here to review.`,
          title: `Change in order.`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Hello, there is modification in your order. Click here to review.`,
                title: `Change in order.`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Hello, there is modification in your order. Click here to review.`,
                title: `Change in order.`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, you wanted a change in your order for medicines, and we have accepted the change. We'll send you the confirmation shortly. If you need any help at all, call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges apply), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
      },

    ]
  },

  {
    category: 'diagnostic_online',
    items: [
      {
        trigger: {
          name: 'BOOKING_RECEIVED'
        },
        data: {
          name: '',
          labName: '',
          body: `We've received your booking request for home visit, and will confirm soon. `,
          title: `Booking received`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've received your booking request for a home visit  with {{labName}} at a discount, through your Edelweiss Digital OPD Policy. If you need`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `We've received your booking request for home visit, and will confirm soon. `,
                title: `Booking received`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `We've received your booking request for home visit, and will confirm soon. `,
                title: `Booking received`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your test booking request has been received.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_ACCEPTANCE'
        },
        data: {
          name: '',
          labName: '',
          body: `We've accepted your booking request for home visit, and will confirm soon. `,
          title: `Booking acceptance`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          test:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've accepted your booking request for a home visit  with {{labName}} {{test}} at a discount, through your Edelweiss Digital OPD Policy. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com.Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `We've accepted your booking request for home visit, and will confirm soon. `,
                title: `Booking acceptance`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `We've accepted your booking request for home visit, and will confirm soon. `,
                title: `Booking acceptance`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your test booking request has been accepted.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_CONFIRMATION'
        },
        data: {
          body: `Thanks for your payment. Your home visit is confirmed!`,
          title: `Booking confirmation`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Template already given`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Thanks for your payment. Your home visit is confirmed!`,
                title: `Booking confirmation`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Thanks for your payment. Your home visit is confirmed!`,
                title: `Booking confirmation`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Template already given',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PAYMENT_FOR_BOOKING'
        },
        data: {
          name: '',
          body: `Complete your booking in a jiffy! Just click here to pay.`,
          title: `Payment for booking`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          link:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, to complete your home visit booking, click here {{link}} to make your payment. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Complete your booking in a jiffy! Just click here to pay.`,
                title: `Payment for booking`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Complete your booking in a jiffy! Just click here to pay.`,
                title: `Payment for booking
                `,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: The payment link for your home visit.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_COMPLETION'
        },
        data: {
          name: '',
          body: `Your test booking is done - all the best for it!`,
          title: `Booking completion`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}} , your booking for a home visit is complete. All the best for the test! If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your test booking is done - all the best for it!`,
                title: `Booking completion`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your test booking is done - all the best for it!`,
                title: `Booking completion`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your home visit in confirmed.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'REPORT_AVAILABILITY'
        },
        data: {
          name: '',
          labName: '',
          body: `Your test is completed, and the report will come your way soon!`,
          title: `Reports availability`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          test:''


        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, thanks for completing your test with {{labName}} {{test}} through your Edelweiss Digital OPD Policy. The report will reach you within 72 hours on your registered email ID. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your test is completed, and the report will come your way soon!`,
                title: `Reports availability`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your test is completed, and the report will come your way soon!`,
                title: `Reports availability`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your test has been completed.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'CANCELLATION_REFUND'
        },
        data: {
          name: '',
          body: `Your home visit booking has been cancelled, as per your request.`,
          title: `Cancellation & Refund`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, you asked us to cancel your home visit for a lab test, and it’s been done! You will get the refund in your account within 4-5 working days. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your home visit booking has been cancelled, as per your request.`,
                title: `Cancellation & Refund`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your home visit booking has been cancelled, as per your request.`,
                title: `Cancellation & Refund`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Your home visit has been cancelled.',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'INVOICE_GENERATED'
        },
        data: {
          body: `Invoice for your booking has been generated.`,
          title: `Invoice Generated`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          link:''
        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, to complete your home visit booking, click here {{link}} to make your payment. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Invoice for your booking has been generated.`,
                title: `Invoice Generated`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Invoice for your booking has been generated.`,
                title: `Invoice Generated`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'PAYMENT_COMPLETED'
        },
        data: {
          body: `Your payment is completed for the booking.`,
          title: `Thank you!`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your payment is completed for the booking.`,
                title: `Thank you!`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your payment is completed for the booking.`,
                title: `Thank you!`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'BOOKING_MODIFICATION'
        },
        data: {
          body: `Hello, there is change in your booking. Click here to review.`,
          title: `Change in booking.`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Hello, there is change in your booking. Click here to review.`,
                title: `Change in booking.`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Hello, there is change in your booking. Click here to review.`,
                title: `Change in booking.`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
    ]
  },
  {
    category: 'diagnostic_offline',
    items: [
      {
        trigger: {
          name: 'BOOKING_RECEIVED'
        },
        data: {
          name: '',
          labName: '',
          body: `We've received your booking request for a test, and will confirm soon. `,
          title: `Booking received`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've received your booking request for a test at {{labName}} at a discount, through your Edelweiss Digital OPD Policy. If you need any help at`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `We've received your booking request for a test, and will confirm soon. `,
                title: `Booking acceptance`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `We've received your booking request for a test, and will confirm soon. `,
                title: `Booking acceptance`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: `Your test booking request has been received.
            <br>
            Need a test done? We’ve got your request, 
            and are working super-quick on it.`,
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_ACCEPTANCE'
        },
        data: {
          name: '',
          labName: '',
          body: `We've accepted your booking request for a test, and will confirm soon. `,
          title: `Booking acceptance`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          test:''


        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, we've accepted your booking request for a test at {{labName}} {{test}} at a discount, through your Edelweiss Digital OPD Policy. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com.Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `We've accepted your booking request for a test, and will confirm soon. `,
                title: `Booking acceptance`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `We've accepted your booking request for a test, and will confirm soon. `,
                title: `Booking acceptance`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: `Your test booking request has been accepted.
            <br>
            Need a test done? We’ve got your request, 
            and are working super-quick on it.`,
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_COMPLETION'
        },
        data: {
          name: '',
          body: `Your booking to visit a test centre has been completed!`,
          title: `Booking completion`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, your booking to visit a test centre has been completed. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your booking to visit a test centre has been completed!`,
                title: `Booking completion`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your booking to visit a test centre has been completed!`,
                title: `Booking completion`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: `Your test centre visit in confirmed.
            <br>
            You're on your way for a test, so all the best!`,
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-completion.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'BOOKING_CONFIRMATION'
        },
        data: {

          body: `Your test centre visit is confirmed. Thanks for your payment!`,
          title: `Booking confirmation`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Template already given`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your test centre visit is confirmed. Thanks for your payment!`,
                title: `Booking confirmation`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your test centre visit is confirmed. Thanks for your payment!`,
                title: `Booking confirmation`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Template already given',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-confirmation.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PAYMENT_FOR_BOOKING'
        },
        data: {
          name: '',
          body: `Complete your booking in a jiffy! Just click here to pay.`,
          title: `Payment for booking`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}} , to complete your booking for a test centre visit, click here to make your payment. If you need any help at all, please call us on our Toll Free`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Complete your booking in a jiffy! Just click here to pay.`,
                title: `Payment for booking`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Complete your booking in a jiffy! Just click here to pay.`,
                title: `Payment for booking`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: `The payment link for your centre visit. <br>To complete your booking for the test centre visit, 
            make your payment with ease!`,
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-payment.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'REPORT_AVAILABILITY'
        },
        data: {
          name: '',
          labName: '',
          body: `Your test is completed, and the report will come your way soon!`,
          title: `Reports availability`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          test:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, thanks for visiting and completing your test at {{labName}} {{test}} through your Edelweiss Digital OPD Policy. The report will reach you within 72 hours on your registered email ID.
            `,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your test is completed, and the report will come your way soon!`,
                title: `Reports availability`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your test is completed, and the report will come your way soon!`,
                title: `Reports availability`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: `Your test has been completed.
            Waiting for results is tough, whether it’s 
            a school test or a lab test!`,
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'INVOICE_GENERATED'
        },
        data: {
          body: `Invoice for your booking has been generated.`,
          title: `Invoice Generated`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
          link:''

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, to complete your booking for a test centre visit, click here {{link}} to make your payment. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com. Team Edelweiss GI
            `,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Invoice for your booking has been generated.`,
                title: `Invoice Generated`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Invoice for your booking has been generated.`,
                title: `Invoice Generated`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: `Your test has been completed.
            Waiting for results is tough, whether it’s 
            a school test or a lab test!`,
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },
      {
        trigger: {
          name: 'PAYMENT_COMPLETED'
        },
        data: {
          body: `Your payment is completed for the booking.`,
          title: `Thank you!`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Your payment is completed for the booking.`,
                title: `Thank you!`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Your payment is completed for the booking.`,
                title: `Thank you!`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
      {
        trigger: {
          name: 'BOOKING_MODIFICATION'
        },
        data: {
          body: `Hello, there is change in your booking. Click here to review.`,
          title: `Change in booking.`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',
        },

        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Hello, there is change in your booking. Click here to review.`,
                title: `Change in booking.`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Hello, there is change in your booking. Click here to review.`,
                title: `Change in booking.`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
      },
    ]
    
  },

  {
    category: 'diet_nutrition',
    items: [
      {
        trigger: {
          name: 'DIET_CHART'
        },
        data: {
          name: '',
          body: `Asked for your diet chart? To see it, click here.`,
          title: `Diet Chart`,
           is_digital_opd:'true',
          is_active: 'true',
          firstName:'',
          lastName:'',

        },
        sms: [
          {
            channel: 'api',
            type: 'default',
            smsGateway: 'default',
            message: `Hi {{firstName}} {{lastName}}, you asked for your diet chart - one of the many benefits of your Edelweiss Digital OPD Policy. To see your chart, just click here. If you need any help at all, please call us on our Toll Free number 1800 12000 or Landline 022 42312000 (call charges applicable), or email us at support@edelweissinsurance.com.Team Edelweiss GI`,
            mobile: null,
            api: SMS_API_CONFIG,
          }
        ],
        push: {
          android: {
            deviceId: null,
            push: {
              notification: {
                icon: 'ic_stat_ic_notification',
                body: `Asked for your diet chart? To see it, click here.`,
                title: `Diet Chart`,
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
              },
              data: {
                body: `Asked for your diet chart? To see it, click here.`,
                title: `Diet Chart`,
                 is_digital_opd:'true',
                is_active: 'true'

              },
            },
          },
        },
        email: [
          {
            channel: 'api',
            subject: 'Subject line: Here’s your diet chart',
            from: process.env.EMAIL_FROM,
            api: EMAIL_API_CONFIG,
            template: {
              hbsHtmlTemplatePath:
                'src/templates/email/diagnostic-offline/booking-acceptance.hbs'
            },
          },
        ],
      },

    ]

  }
];
