import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import { ProvisioningUpgradePage } from "../../Upgrade/ProvisioningUpgradePage";

export const config: AdminConfigType = {
  icon: "user-2-line",
  type: SettingCategories.USERS,
  categoryType: CategoryType.ACL,
  controlType: SettingTypes.PAGE,
  component: ProvisioningUpgradePage,
  title: "User",
  canSave: false,
  isFeatureEnabled: false,
  isEnterprise: true,
} as AdminConfigType;
