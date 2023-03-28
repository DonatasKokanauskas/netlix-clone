import "../style/css/ProfileMenu.css";
import { useMoviesData } from "../context/Context";
import { BsPencil } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";

export default function ProfileMenu() {
  const { profileIsHovered } = useMoviesData();

  if (profileIsHovered) {
    return (
      <div className="profile">
        <div className="profile__menu">
          <div>
            <div>
              <span>
                <BsPencil />
              </span>

              <a>Manage Profile</a>
            </div>

            <div>
              <span>
                <BiTransferAlt />
              </span>

              <a>Transfer Profile</a>
            </div>

            <div>
              <span>
                <MdOutlineAccountCircle />
              </span>

              <a>Account</a>
            </div>

            <div>
              <span>
                <BiHelpCircle />
              </span>

              <a>Help Center</a>
            </div>

            <div className="sign-out">
              <a>Sign out of Netflix</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
