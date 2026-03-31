const { spawn } = require('node:child_process')
const path = require('node:path')

const repoRoot = path.resolve(__dirname, '..', '..')

const processes = [
  {
    name: 'frontend',
    cwd: path.join(repoRoot, 'apps/frontend'),
  },
  {
    name: 'backend',
    cwd: path.join(repoRoot, 'apps/backend'),
  },
].map(({ name, cwd }) => {
  const child = spawn('rushx', ['dev'], {
    cwd,
    stdio: 'inherit',
    shell: true,
  })

  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown(code)
    }
  })

  return { name, child }
})

let shuttingDown = false

function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true

  for (const { child } of processes) {
    if (!child.killed) {
      child.kill('SIGTERM')
    }
  }

  process.exit(code)
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
