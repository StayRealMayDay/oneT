const { execSync } = require('node:child_process')
const path = require('node:path')

function resolvePackageDir() {
  const packageJsonPath = require.resolve('better-sqlite3/package.json', {
    paths: [process.cwd()],
  })

  return path.dirname(packageJsonPath)
}

function canLoadBinding() {
  try {
    const Database = require(require.resolve('better-sqlite3', { paths: [process.cwd()] }))
    const db = new Database(':memory:')
    db.close()
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!message.includes('Could not locate the bindings file')) {
      throw error
    }

    return false
  }
}

if (!canLoadBinding()) {
  const packageDir = resolvePackageDir()

  console.log('Rebuilding better-sqlite3 native binding...')
  execSync('pnpm exec prebuild-install || node-gyp rebuild --release', {
    cwd: packageDir,
    stdio: 'inherit',
    shell: true,
  })
}
