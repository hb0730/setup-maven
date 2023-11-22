import * as core from '@actions/core'
import {
  installMaven,
  installDownloadedMaven,
  installExtractedMaven
} from './installer'

export async function setupMaven(): Promise<void> {
  try {
    const mavenVersion = core.getInput('maven_version')
    if (mavenVersion.length == 0) {
      core.setFailed('Please set maven_version')
    }
    const mavenFile = core.getInput('maven_file')
    const mavenUrl = core.getInput('url')
    if (mavenFile) {
      installExtractedMaven(mavenFile, mavenVersion)
    } else if (mavenUrl) {
      installDownloadedMaven(mavenUrl, mavenVersion)
    } else if (mavenVersion) {
      installMaven(mavenVersion)
    } else {
      core.setFailed('Please set maven_file or url or maven_version')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
