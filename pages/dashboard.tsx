import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  DashboardPage,
  DashboardPageContent,
} from "@/components/layout/dashboard";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import Loading from "@/components/Loading";
import { DashboardHeader } from "@/components/layout/header/dashboard-header";
const Loader = () => <Loading />;
export function DashboardIndex() {
  const router = useRouter();
  const AuthUser = useAuthUser();

  return (
    <DashboardPage user={AuthUser}>
      <DashboardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm">Dashboard</p>
            <h1 className="text-lg font-semibold leading-[38px] lg:text-xl lg:leading-[38px]">
              Halo {AuthUser?.displayName}
            </h1>
          </div>
        </div>
      </DashboardHeader>
      <DashboardPageContent className="z-50">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Statistik
        </h3>
      </DashboardPageContent>
    </DashboardPage>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(DashboardIndex);
