import Amplify from 'aws-amplify'
import awsConfig from '../aws-exports'

export default async () => {
  console.log('amplify configured')
  Amplify.configure(awsConfig)
}
