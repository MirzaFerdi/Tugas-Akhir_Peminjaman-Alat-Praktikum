const ForbiddenPage = () => {
  const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-extrabold">ACCESS DENIED!</h1>
        <h1 className="font-extrabold text-[14rem] text-zinc-400">403</h1>
        <p className="text-lg italic tracking-wide mb-6">
          Mohon maaf anda tidak memiliki akses untuk membuka halaman ini!
        </p>
        <a
          href={userPayloads?.user?.role_id === 1 ? "/admin" : "/mahasiswa"}
          className="block bg-main hover:bg-main-hover transition-colors duration-150 text-white py-2 px-5 rounded-md">
          Kembali ke halaman anda
        </a>
      </div>
    </div>
  );
};

export default ForbiddenPage;
