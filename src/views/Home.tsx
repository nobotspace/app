/*
 * Home.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { useCreateNobotMutation } from "api/appsync/api.enhanced";
import { UserNobot, useGetUserQuery, useListNobotsQuery } from "api/appsync/api.generated";
import { useAppSelector } from "app/hooks";
import classNames from "classnames";
import NobotCard from "components/NobotCard";
import { selectSub } from "slices/authSlice";

export default function Home() {
  const sub = useAppSelector(selectSub);
  const { data } = useGetUserQuery({ id: sub! }, { skip: !sub });
  const { data: nobots } = useListNobotsQuery();
  const [mutate, { isLoading }] = useCreateNobotMutation();

  return (
    <>
      <main className="HomePage">
        <div className="HomePage__interface">
          {nobots ? <>
            {nobots.listNobots.items.map((nobot) => <NobotCard key={nobot.id} nobot={nobot as UserNobot} />)}
          </> : <>Loading...</>}
          <button className={classNames("HomePage__generatebutton", {
            "HomePage__generatebutton-disabled": isLoading
          })} onClick={sub ? () => mutate({ user_id: sub }) : undefined}>GENERATE</button>
        </div>
      </main>
    </>
  );
}
