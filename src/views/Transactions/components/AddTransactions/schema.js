export const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 5
    }
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
      minimum: 5
    }
  },
  transaction_type: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  tags: {
    presence: { allowEmpty: false, message: 'are required' }
  },
  amount: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true,
      greaterThan: 0
    }
  }
}
