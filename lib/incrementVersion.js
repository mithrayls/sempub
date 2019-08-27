function incrementVersion( version, release_type ){

  let version_arr = version.split('.')

  if ( release_type === 'patch'){
    let new_version = Number(version_arr[2]) + 1
    version_arr[2] = String(new_version)
  } else if ( release_type === 'minor'){
    let new_version = Number(version_arr[1]) + 1
    version_arr[1] = String(new_version)
    version_arr[2] = "0"
  } else if ( release_type === 'major'){
    let new_version = Number(version_arr[0]) + 1
    version_arr[0] = String(new_version)
    version_arr[1] = "0"
    version_arr[2] = "0"
  }

  version = version_arr.join('.')

  return version

}

module.exports = incrementVersion
