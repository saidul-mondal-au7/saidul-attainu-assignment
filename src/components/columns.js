import { format } from 'date-fns';

export const COLUMNS = [
    {
      Header: 'Full Name',
      accessor: 'Full Name',
      disableFilters: true
      
    },
    {
      Header: 'Date of birth',
      accessor: 'Date of birth',
      Cell: ({ value }) => {
        return format(new Date(value), 'do MMM yyyy')
      },
      
    },
    {
      Header: 'Country',
      accessor: 'Country',
    },
    {
      Header: 'Email',
      accessor: 'Email',
      disableFilters: true
    }
  ]
