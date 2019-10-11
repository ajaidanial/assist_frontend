export const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  card: {
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  cardContent: {},
  cardFooter: {
    justifyContent: 'flex-end'
  }
})
