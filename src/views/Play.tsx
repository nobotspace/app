/*
 * Play.tsx
 * author: evan kirkiles
 * created on Wed May 10 2023
 * 2023 the nobot space 
 */

import { useGetNobotQuery } from "api/appsync/api.generated";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import World from "web-worlding";

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
}

export default function Play() {
  // get params to figure out which nobot to show
  const [params] = useSearchParams();

  const { data: nobot } = useGetNobotQuery({ id: params.get("id")!, user_id: params.get("user_id")! });

  // connect canvas to game
  const canvasRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<World | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const loadingDRef = useRef<HTMLDivElement>(null);
  const loadingTRef = useRef<HTMLDivElement>(null);
  const viewToggleRef = useRef<HTMLDivElement>(null);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // initialize the world immediately
  useEffect(() => {
    if (!nobot || !nobot.getNobot.resources) return;
    // if there is a world, destroy it
    if (worldRef.current) {
      worldRef.current.destroy();
    }
    // now rebuild it with the better world
    var WebWorld: typeof World = require('web-worlding').default;
    worldRef.current = new WebWorld(
      canvasRef.current!,
      `https://${nobot.getNobot.resources.body.model.bucket}.s3.amazonaws.com/${nobot.getNobot.resources.body.model.key}`,
      'https://nobotspace-next-git-maria-evankirkiles.vercel.app/assets/worlds/room.glb',
      {
        onDownloadFinish: () => setIsLoading(false),
        onDownloadProgress: (p: number, d: number, t: number) => {
          if (
            loadingRef.current &&
            loadingDRef.current &&
            loadingTRef.current
          ) {
            loadingRef.current.style.transform = `scaleX(${p})`;
            loadingDRef.current.textContent = formatBytes(d, 1);
            loadingTRef.current.textContent = formatBytes(t, 1);
          }
        },
      },
      {
        pixelRatio: 0.4
      }
    );
  }, [nobot]);

  return (
    <main className="PlayPage" ref={canvasRef}>
    {isLoading ? (
      <div className="PlayPage__loadinner">
        <div>Loading...</div>
        <div className="PlayPage__loadingbar">
          <div className="PlayPage__loadingpercentage" ref={loadingRef}></div>
        </div>
        <div className="PlayPage__loadingnumbers">
          <div className="PlayPage__loadingnumbers_downloaded" ref={loadingDRef}>
            0mb
          </div>
          <div>/</div>
          <div className="PlayPage__loadingnumbers_total" ref={loadingTRef}>
            0mb
          </div>
        </div>
      </div>
    ) : null}

    </main>
  )
}