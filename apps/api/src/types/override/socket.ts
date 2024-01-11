import { Socket } from '@secretlab/socket';

interface ExtendedSocket extends Socket {
  user?: any; // Adjust the type of 'user' as needed
}

export default ExtendedSocket;
