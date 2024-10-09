import React, { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { User } from '../../../models/entities/User';
import { getUserAvatarText, getUserFullName } from '../../utils/helpers';
import './ProfileWithMenu.scss';

type Props = {
  user?: User;
  onLogout?: () => void;
};

const ProfileWithMenu: React.FC<Props> = ({ onLogout, user }) => {
  const avatarText = useMemo(() => getUserAvatarText(user), [user]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className='flex gap-3.5 justify-center items-center'>
        <div className='flex flex-col items-end gap-2 text-base font-medium font-roboto'>
          <p className='max-w-[182px] truncate'>
            {getUserFullName(user)?.toUpperCase()}
          </p>
          <p className='max-w-[182px] truncate text-[#A5A5A5]'>{user?.email}</p>
        </div>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          disableRipple
          className='!p-0'
        >
          <Avatar className='!h-[75px] !w-[75px] !bg-primary border-4 border-disabled'>
            {avatarText}
          </Avatar>
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        className='profile-with-menu'
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            onLogout?.();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileWithMenu;
