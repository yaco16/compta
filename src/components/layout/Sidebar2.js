import { useState } from 'react';
import Link from 'next/link';
import ToggleDarkMode from '../ToggleDarkMode';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import { FaList, FaRegHeart } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';
import { BiCog } from 'react-icons/bi';
import { SiApacheairflow } from 'react-icons/si';
import { GiAbstract050 } from 'react-icons/gi';

import 'react-pro-sidebar/dist/css/styles.css';

export default function Navbar() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div>
        <ProSidebar collapsed={menuCollapse} width={200} className='container'>
          <SidebarHeader>
            <ToggleDarkMode />
            <div className='closeMenu' onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
            <Menu iconShape='square'>
              <MenuItem icon={<FiLogOut />}>Déconnexion</MenuItem>
            </Menu>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape='square'>

              <MenuItem active={true} icon={<FiHome />}>
                <Link href='/'>
                  <a>Accueil</a>
                </Link>
              </MenuItem>

              <SubMenu title='Category' icon={<FaList />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu>

              <MenuItem active={true} icon={<FiHome />}>
                <Link href='/dashboard/upload'>
                  <a>Import</a>
                </Link>
              </MenuItem>

            </Menu>
          </SidebarContent>

          <SidebarFooter>
            <div>
              <div className='github'>
                <FaGithub />
                <Link href='https://github.com/yaco16/compta'>
                  <a>View Source</a>
                </Link>
              </div>
            </div>
          </SidebarFooter>
        </ProSidebar>
        <style jsx>{`
          .container {
            position: fixed;
            top: 15%;
            background-color: #0c1e35;
          }

          .closeMenu {
            position: fixed;
            left: 0;
          }

          .github {
            width: 80%;
            display: flex;
            justify-content: center;
            background-color: #18293f;
            font-size: 0.8rem;
            border-radius: 15px;
            padding: 0.6rem;
            margin: 0.8rem auto 0.8rem auto;
          }

          .github a {
            margin-left: 0.2rem;
          }
        `}</style>
      </div>
    </>
  );
}
