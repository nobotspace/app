/*
 * index.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { UserNobot } from "api/appsync/api.generated"
import { Link } from "react-router-dom";

interface NobotCardProps {
  nobot: UserNobot;
}

export default function NobotCard({ nobot }: NobotCardProps) {
  return (
    <Link to={`/nobots?id=${nobot.id}&user_id=${nobot.user_id}`} className="NobotCard">
      {nobot.resources ? <>
        <img className="NobotCard__image" src={`https://${nobot.resources.head.icon.bucket}.s3.amazonaws.com/${nobot.resources.head.icon.key}`} alt="Nobot head" />
      </> : <>Generating...</>}
    </Link>
  )
}