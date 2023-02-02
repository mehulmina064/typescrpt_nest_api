## Environment Config

1. Development Config
   - create src/core/config/development.env based on src/core/config/sample.env
2. Production Config
   - create src/core/config/production.env based on src/core/config/sample.env


## User role permission view
CREATE OR REPLACE VIEW public.user_role_permissions
AS SELECT u.id AS user_id,
    u.name AS user_name,
    urp.role_id,
    u.type,
    roles.name AS role_name,
    rpm.permission_id,
    permissions.name AS permission_name,
    u.is_active
   FROM users u
     JOIN user_role urp ON u.id = urp.user_id
     JOIN role_permission rpm ON urp.role_id = rpm.role_id
     JOIN roles ON rpm.role_id = roles.id
     JOIN permissions ON rpm.permission_id = permissions.id
  ORDER BY u.id, urp.role_id, rpm.permission_id;