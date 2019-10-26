import { SendRequest } from '../api'

/**
 * To get the list of tags
 * Also passed as a props to AddTag
 */
export const getTagsData = (self) => {
  SendRequest({}, 'GET', '/api/tags/').then((response) => {
    if (response.success) {
      const { data } = response
      self.setState({
        ...self.state,
        tags_data: data
      })
    }
  })
}
