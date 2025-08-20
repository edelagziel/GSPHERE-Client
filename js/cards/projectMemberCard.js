import { roles } from "../data/projectEnums.js";

// מיפוי הפוך: name -> id (תומך גם ב־role_name מהשרת)
const roleNameToId = Object.fromEntries(
  Object.entries(roles).map(([id, name]) => [name, Number(id)])
);

// פונקציה לבניית options — Owner (11) נעול (disabled)
function buildRoleOptions(selectedId) {
  return Object.entries(roles)
    .map(([id, name]) => {
      const sel = Number(id) === Number(selectedId) ? "selected" : "";
      const disabled = Number(id) === 11 ? "disabled" : "";
      return `<option value="${id}" ${sel} ${disabled}>${name}</option>`;
    })
    .join("");
}

export function createProjectMemberCard(member = {}, projectId) {
  // קח את ה־roleId לפי סדר: מספר מזהה > שם תפקיד > none (12)
  let roleId = member.role_id ?? member.roleId ?? member.role;
  if (roleId === undefined || roleId === null) {
    if (member.role_name && roleNameToId[member.role_name]) {
      roleId = roleNameToId[member.role_name];
    } else {
      roleId = 12; // fallback
    }
  }

  // שם מלא
  const first = member.first_name ?? member.firstName ?? "";
  const last  = member.last_name  ?? member.lastName  ?? "";
  const name = (
    member.fullname ??
    member.full_name ??
    ((`${first} ${last}`).trim() !== "" ? `${first} ${last}`.trim() : undefined) ??
    member.username ??
    (member.email ? member.email.split("@")[0] : undefined) ??
    "Unknown"
  );

  const email =
    member.email ?? member.user_email ?? member.contact_email ?? "";
  const avatar =
    member.profile_picture_url ??
    member.avatar_url ??
    member.image_url ??
    "https://randomuser.me/api/portraits/lego/1.jpg";

  const userId = member.user_id ?? member.id ?? member.userId ?? "";

  // Manager?
  const isManager =
    Number(roleId) === (roleNameToId["Owner"] ?? -1) ||
    Number(roleId) === (roleNameToId["Product Manager"] ?? -1) ||
    Number(roleId) === (roleNameToId["Manager"] ?? -1);

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card p-3 d-flex flex-row align-items-center h-100">
        <img src="${avatar}" alt="${name}" class="rounded-circle me-3" style="width:56px;height:56px;object-fit:cover;">
        <div class="flex-grow-1">
          <div class="fw-semibold">
            ${name}
            ${isManager ? '<span class="badge bg-warning text-dark ms-1">Manager</span>' : ""}
          </div>
          <div class="small text-muted mb-2">${email}</div>
          <div class="d-flex align-items-center gap-2">
            <select
              class="form-select form-select-sm role-select"
              data-userid="${userId}"
              data-projectid="${projectId}"
              data-old-value="${roleId}">
              ${buildRoleOptions(roleId)}
            </select>
            <div class="role-error text-danger small" style="display:none;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}
