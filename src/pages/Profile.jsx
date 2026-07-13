import useProfile from "../hooks/useProfile";

import ProfileCard from "../components/profile/ProfileCard";
import PasswordCard from "../components/profile/PasswordCard";

export default function Profile() {
  const {
    profile,
    loading,
    saveProfile,
    refreshProfile,
  } = useProfile();

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          👤 My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your account information and password.
        </p>

      </div>

      <ProfileCard
        profile={profile}
        onSave={saveProfile}
        onRefresh={refreshProfile}
      />

      <PasswordCard />

    </div>
  );
}