import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

/*
 * Material icons, not hand-drawn SVG. One lookup table so components ask for
 * an icon by name instead of importing MUI paths directly.
 */

const registry = {
  whatsapp: WhatsAppIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  menu: MenuIcon,
  close: CloseIcon,
  mail: MailOutlineIcon,
  phone: LocalPhoneIcon,
  pin: PlaceIcon,
  clock: ScheduleIcon,
  groups: GroupsIcon,
  school: SchoolIcon,
  calendar: CalendarMonthIcon,
  building: ApartmentIcon,
  arrowForward: ArrowForwardIcon,
  chevronLeft: KeyboardArrowLeftIcon,
  chevronRight: KeyboardArrowRightIcon,
};

export default function Icon({ name, size = 20, className }) {
  const Component = registry[name];
  if (!Component) throw new Error(`Unknown icon "${name}"`);
  return <Component className={className} style={{ fontSize: size }} aria-hidden="true" />;
}
