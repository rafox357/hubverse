import Docker from 'dockerode';

const docker = new Docker({
  socketPath: '/var/run/docker.sock',
  // or for Windows:
  // host: 'tcp://localhost',
  // port: 2375
});