export function Footer() {
  return (
    <footer className="w-full flex justify-between px-[30px] py-[30px] mb-[60px] border-t-[1px] border-gray-400 leading-8">
      <div className="flex lg:gap-50 gap-20 w-1/3">
        <ul className="footer-menu">
          <li className="footer-header font-semibold">Company</li>
          <li><a href="">About</a></li>
          <li><a href="">Jobs</a></li>
          <li><a href="">Support</a></li>
        </ul>
        <ul className="footer-menu">
          <li className="footer-header font-semibold">Communities</li>
          <li><a href="">Artists</a></li>
          <li><a href="">Developers</a></li>
          <li><a href="">Advertising</a></li>
          <li><a href="">Investors</a></li>
          <li><a href="">Vendors</a></li>
        </ul>
      </div>
      <ul className="flex gap-3">
        <li><a href=""><img src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" alt="email" /></a></li>
        <li><a href=""><img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" alt="instagram" /></a></li>
        <li><a href=""><img src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" alt="facebook" /></a></li>
      </ul>
    </footer>
  );
}
