import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, Chip } from '@material-ui/core'
// form utilities
import { styles } from './styles' // styles for the form

const ModifyTags = (props) => {
  // get props
  const { className, tagData, ...rest } = props
  // get the styles
  const classes = makeStyles(styles)()

  /**
   * Handles the delete of a tag.
   * @param {the id of a tag} id
   */
  const handleDeleteTag = (id) => {
    alert(`delete tag ${id}`)
  }

  /**
   * Handles the click of a tag.
   * @param {the id of a tag} id
   */
  const handleClickTag = (id) => {
    alert(`click tag ${id}`)
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader subheader="View and delete a tag here" title="User Tag's" />
      <Divider />
      <CardContent>
        {tagData.map((singleData) => (
          <Chip
            className={classes.chip}
            clickable
            color="primary"
            key={singleData.id}
            label={singleData.name}
            onClick={() => handleClickTag(singleData.id)}
            onDelete={() => handleDeleteTag(singleData.id)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

ModifyTags.propTypes = {
  className: PropTypes.string,
  tagData: PropTypes.array
}

export default ModifyTags
