import { ChangeEventHandler, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { getLocalDate } from '../../../../../utils'
import { Transaction, useCategoriesQuery } from '../../../../../graphql/__generated__/graphql.gen'
import { useTranslation } from 'react-i18next'

export interface DataTransactionsForm {
  expense: boolean
  income: boolean
  amount: number | string
  category: string
  createdAt: string
  commentary: string
}

const defaultValueFormData: DataTransactionsForm = {
  expense: true,
  income: false,
  amount: '',
  category: '',
  createdAt: '',
  commentary: ''
}

export const useTransactionsForm = (transaction?: Transaction) => {
  const { t } = useTranslation()
  const alert = useAlert()
  const navigate = useNavigate()

  const [dataForm, setDataForm] = useState<DataTransactionsForm>(defaultValueFormData)

  useEffect(() => {
    if (transaction != null) {
      const getFormData = getTransactionFormData(transaction)
      setDataForm({
        expense: getFormData.expense,
        income: getFormData.income,
        amount: getFormData.amount,
        category: getFormData.category,
        createdAt: getFormData.createdAt,
        commentary: getFormData.commentary
      })
    }
  }, [])

  const { data, error } = useCategoriesQuery()

  const categories = data?.categories ?? []

  if (error != null) alert.error(t('alert.failed'))

  const onChange: ChangeEventHandler<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement> =
    (e) => {
      const typeChange = e.target.id
      const valueChange = e.target.value

      switch (typeChange) {
        case 'amount':
          setDataForm({
            ...dataForm,
            amount: Number(valueChange) || dataForm?.amount
          })
          break
        case 'category':
          if (valueChange === 'create') navigate('/categories')
          setDataForm({
            ...dataForm,
            category: valueChange
          })
          break
        case 'createdAt':
          setDataForm({
            ...dataForm,
            createdAt: valueChange
          })
          break
        case 'commentary':
          setDataForm({
            ...dataForm,
            commentary: valueChange
          })
          break
        case 'expense':
          setDataForm({
            ...dataForm,
            expense: true,
            income: false
          })
          break
        case 'income':
          setDataForm({
            ...dataForm,
            expense: false,
            income: true
          })
          break
        default:
          break
      }
    }

  return {
    onChange,
    dataForm,
    categories
  }
}

const getTransactionFormData = (transaction: Transaction) => {
  const expense = transaction?.amount ? Math.sign(transaction.amount) <= 0 : true
  const income = transaction?.amount ? Math.sign(transaction.amount) > 0 : false
  const amount = transaction?.amount ? Math.abs(transaction.amount) : ''
  const category = transaction?.category?.id ? transaction.category.id : ''
  const createdAt = transaction?.createdAt ? getLocalDate(transaction.createdAt) : ''
  const commentary = transaction?.commentary ? transaction.commentary : ''

  return {
    expense,
    income,
    amount,
    category,
    createdAt,
    commentary
  }
}
