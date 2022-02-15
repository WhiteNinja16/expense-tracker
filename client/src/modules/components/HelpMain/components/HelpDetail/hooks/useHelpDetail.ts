import { useParams } from 'react-router-dom'
import { useHelpDetailQuery, useUpdateHelpMutation } from '../../../../../graphql/__generated__/graphql.gen'

const locales = 'ru'

const formatter = new Intl.DateTimeFormat(locales, {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

export const useHelpDetail = () => {
  const helpId = useParams()['id'] ?? ''

  const helpDetailResponse = useHelpDetailQuery({
    variables: {
      input: {
        id: helpId
      }
    }
  })

  const [updateHelp, { loading, error }] = useUpdateHelpMutation({
    refetchQueries: ['helpDetail']
  })

  const getDate = (date: string | Date) => {
    return formatter.format(new Date(date))
  }

  const handleSolved = async () => {
    if (helpId) {
      await updateHelp({ variables: { input: { id: helpId, solved: true } } })
    }
  }

  const handleUnresolved = async () => {
    if (helpId) {
      await updateHelp({ variables: { input: { id: helpId, solved: false } } })
    }
  }

  return {
    helpDetailResponse,
    getDate,
    handleSolved,
    handleUnresolved,
    updateHelpResponse: {
      loading,
      error
    }
  }
}
