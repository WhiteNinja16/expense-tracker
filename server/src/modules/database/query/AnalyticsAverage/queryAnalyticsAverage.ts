import { TransactionModel } from '../../../models/index.js'
import { QueryAnalytics, ResponseAnalytics } from '../../types/index.js'
import { analyticsFilterBuilder } from '../../../service/analytic/analyticsFilterBuilder/index.js'

export const queryAnalyticsAverage: QueryAnalytics = async (userId, input) => {
  let filter = {}

  if (input?.filter !== undefined && input?.filter !== null) {
    filter = analyticsFilterBuilder(input.filter)
  }

  const response = await TransactionModel.aggregate([
    {
      $facet: {
        income: [
          {
            $match: {
              user: userId,
              amount: {
                $gt: 0
              },
              ...filter
            }
          },
          {
            $group: {
              _id: null,
              average: {
                $avg: '$amount'
              }
            }
          }
        ],
        expanse: [
          {
            $match: {
              user: userId,
              amount: {
                $lt: 0
              },
              ...filter
            }
          },
          {
            $group: {
              _id: null,
              average: {
                $avg: '$amount'
              }
            }
          }
        ]
      }
    }
  ])

  const income: number = response[0]?.income[0]?.average ?? 0
  const expanse: number = response[0]?.expanse[0]?.average ?? 0

  const result: ResponseAnalytics = {
    income,
    expanse
  }

  return result
}
