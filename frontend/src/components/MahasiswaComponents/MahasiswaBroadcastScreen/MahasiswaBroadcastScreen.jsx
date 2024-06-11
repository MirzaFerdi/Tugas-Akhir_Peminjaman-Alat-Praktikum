import { useCallback, useState } from "react";
import { useFetchOnMount } from "../../../hooks/useFetchOnMount";
import { bcIcon } from "../../../assets";

const MahasiswaBroadcastScreen = () => {
  const [broadcast, setBroadcast] = useState([]);

  const handleGetBroadcast = useCallback((bcData) => {
    if (bcData?.data?.length > 0) {
      setBroadcast(bcData?.data);
    }
  }, []);

  const { data: _ } = useFetchOnMount({
    url: "/broadcast",
    method: "GET",
    onSuccess: handleGetBroadcast,
  });

  return (
    <div className="w-1/2">
      {broadcast.map((broadcasts) => {
        const { id, judul, pesan } = broadcasts;

        return (
          <div key={id} className="mb-8 px-5 py-3 shadow-md">
            <div className="flex justify-start items-center gap-5 mb-3">
              <img
                src={bcIcon}
                alt="Broadcast Icon Message Announcement"
                width={32}
                height={32}
                className="aspect-square"
              />
              <h1 className="text-md font-medium tracking-wide">{judul}</h1>
            </div>
            <p className="text-sm text-justify">{pesan}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MahasiswaBroadcastScreen;
