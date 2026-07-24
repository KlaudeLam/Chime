export function Premium() {
  return (
    <div id="page-body" className="mb-20 flex flex-col gap-[24px] px-[30px] py-[8px]">
      <div className="px-4 mx-auto max-w-8xl lg:px-4">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:font-extrabold lg:text-4xl lg:leading-snug lg:text-center 2xl:px-48">
          Choose Your Premium
        </h2>
        <p className="mb-10 text-lg font-normal text-gray-500 lg:text-center lg:text-xl lg:mb-16">
          Listen without limits with customized plan just for you
        </p>
        <div className="flex justify-between max-md:flex-col gap-16 bg-gray-50 p-8 rounded-lg">
          <div className="mb-8 md:mb-0 w-full">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Community edition</h3>
            <span className="block mb-4 text-4xl font-extrabold text-gray-900">Free</span>
            <ul className="mb-4 text-sm text-gray-500">
              <li className="before:content-['\\2714\\0020']">Limited music library access</li>
              <li className="before:content-['\\2714\\0020']">Ad-supported</li>
              <li className="before:content-['\\2714\\0020']">No offline listening</li>
              <li className="before:content-['\\2714\\0020']">No high-quality audio</li>
            </ul>
            <button className="items-center justify-center w-full px-6 py-2 mb-3 text-base font-medium text-center text-white bg-bittersweet hover:bg-darkbittersweet rounded-full md:mr-5">
              Get started
            </button>
            <p className="text-sm"><a href="" className="underline">Terms and conditions apply</a>.</p>
          </div>

          <div className="mb-8 md:mb-0 w-full">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Let's solo!</h3>
            <span className="mb-4 text-4xl font-extrabold text-gray-900">$9.99</span>
            <ul className="my-4 text-sm text-gray-500">
              <li className="before:content-['\\2714\\0020']">Unlimited music library access</li>
              <li className="before:content-['\\2714\\0020']">Ad-free</li>
              <li className="before:content-['\\2714\\0020']">High-quality audio streaming</li>
              <li className="before:content-['\\2714\\0020']">Offline listening</li>
              <li className="before:content-['\\2714\\0020']">Unlimited skips</li>
              <li className="before:content-['\\2714\\0020']">Personalized recommendations</li>
              <li className="before:content-['\\2714\\0020']">Exclusive releases and content</li>
              <li className="before:content-['\\2714\\0020']">Cross-platform compatibility</li>
            </ul>
            <button className="items-center justify-center w-full px-6 py-2 mb-3 text-base font-medium text-center text-bittersweet bg-white hover:bg-white ring-1 ring-bittersweet rounded-full md:mr-5">
              1-month free trial
            </button>
            <button className="items-center justify-center w-full px-6 py-2 mb-3 text-base font-medium text-center text-white bg-bittersweet hover:bg-darkbittersweet rounded-full md:mr-5">
              Buy now
            </button>
            <p className="text-sm">
              <a href="" className="underline">Terms and conditions apply</a>. 1 month free not available for users who have already tried this package.
            </p>
          </div>

          <div className="mb-3 md:mb-0 w-full">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Vibe together</h3>
            <span className="block mb-4 text-4xl font-extrabold text-gray-900">$14.99</span>
            <ul className="mb-4 text-sm text-gray-500">
              <li className="before:content-['\\2714\\0020']">Premium benefits for up to six members</li>
              <li className="before:content-['\\2714\\0020']">Personalized accounts</li>
              <li className="before:content-['\\2714\\0020']">Cost-effective pricing</li>
              <li className="before:content-['\\2714\\0020']">Family playlists</li>
              <li className="before:content-['\\2714\\0020']">Parental controls</li>
              <li className="before:content-['\\2714\\0020']">Synced playback</li>
              <li className="before:content-['\\2714\\0020']">Simplified billing</li>
              <li className="before:content-['\\2714\\0020']">Exclusive family content</li>
              <li className="before:content-['\\2714\\0020']">Enhanced customer support</li>
            </ul>
            <button className="items-center justify-center w-full px-6 py-2 mb-3 text-base font-medium text-center text-bittersweet bg-white ring-1 ring-bittersweet rounded-full md:mr-5">
              1-month free trial
            </button>
            <button className="items-center justify-center w-full px-6 py-2 mb-3 text-base font-medium text-center text-white bg-bittersweet hover:bg-darkbittersweet rounded-full md:mr-5">
              Buy now
            </button>
            <p className="text-sm">
              <a href="" className="underline">Terms and conditions apply</a>. 1 month free not available for users who have already tried this package.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
