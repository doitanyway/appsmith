import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import UserListPage  from "../../UserList/UserListPage";

export const config: AdminConfigType = {
  icon: "user-2-line",
  type: SettingCategories.USERS,
  categoryType: CategoryType.ACL,
  controlType: SettingTypes.PAGE,
  component: UserListPage,
  title: "User",
  canSave: false,
  isFeatureEnabled: true,
  isEnterprise: false,
} as AdminConfigType;
