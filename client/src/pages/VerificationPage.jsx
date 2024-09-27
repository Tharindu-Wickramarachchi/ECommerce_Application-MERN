function VerificationPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 md:shadow-[0px_19px_38px_rgba(0,0,0,0.3),0px_15px_12px_rgba(0,0,0,0.22)] mx-auto w-full max-w-lg rounded-xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-base font-medium text-gray-600">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-10">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-400"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-400"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-400"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-3xl bg-white focus:bg-gray-50 focus:ring-1 ring-blue-400"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-lg outline-none py-3 bg-blue-400 border-none text-black text-lg font-semibold">
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-base font-medium space-x-1 text-gray-600">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-500"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;
