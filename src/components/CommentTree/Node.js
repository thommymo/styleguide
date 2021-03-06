import React from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

const Node = props => {
  const {
    visualDepth: visualDepth0 = 1,
    head: head0,
    tail: tail0,
    logicalDepth = 0,
    otherChild: otherChild0 = false,
    t,
    top,
    displayAuthor,
    comment,
    timeago,
    onEditPreferences,
    isAdmin,
    More
  } = props

  const {comments} = comment
  const hasChildren = comments && comments.totalCount > 0

  // Adjust the visual depth and other options based on the shape of the comment
  // (and its children).
  const {visualDepth, head, tail, otherChild} = (() => {
    if (top) {
      if (hasChildren) {
        // Top node with children. Is head but not tail so that the
        // bar continues.
        return {
          visualDepth: 1,
          head: true,
          tail: false,
          otherChild: false
        }
      }

      // Top node with no children. No vertical bars.
      return {
        visualDepth: 1,
        head: true,
        tail: true,
        otherChild: true
      }
    }

    if (otherChild0) {
      if (hasChildren) {
        // An 'otherChild' with children itself. Clear the 'otherChild'
        // flag and increase the visual depth, so that we can draw
        // a continuous bar across all children.
        return {
          visualDepth: visualDepth0 + 1,
          head: true,
          tail: false,
          otherChild: false
        }
      }

      // An 'otherChild' with no children. Keep the vertical bar continuous.
      return {
        visualDepth: visualDepth0 + 1,
        head: false,
        tail: false,
        otherChild: true
      }
    }

    if (hasChildren) {
      return {
        visualDepth: visualDepth0,
        head: head0,
        tail: false,
        otherChild: false
      }
    }

    return {
      visualDepth: visualDepth0,
      head: head0,
      tail: tail0,
      otherChild: otherChild0
    }
  })()

  const This = (
    <Row
      key='this'
      t={t}
      visualDepth={visualDepth}
      head={head}
      tail={tail}
      otherChild={otherChild}
      comment={comment}
      displayAuthor={displayAuthor}
      onEditPreferences={onEditPreferences}
      isAdmin={isAdmin}
      submitComment={props.submitComment}
      editComment={props.editComment}
      upvoteComment={props.upvoteComment}
      downvoteComment={props.downvoteComment}
      unpublishComment={props.unpublishComment}
      timeago={timeago}
    />
  )

  if (comments === undefined) {
    return This
  }

  const {nodes} = comments

  return [
    This,
    ...(() => {
      if (nodes && nodes.length > 0) {
        const [firstChild, ...otherChildren] = nodes

        return [
          ...otherChildren.map((c, i) => (
            <Node
              {...props}
              key={i}
              top={false}
              logicalDepth={logicalDepth + 1}
              visualDepth={visualDepth}
              head={true}
              tail={true}
              otherChild
              comment={c}
            />
          )),
          <More
            key='more'
            visualDepth={visualDepth + 1}
            logicalDepth={logicalDepth + 1}
            comment={comment}
          />,
          <Node
            {...props}
            top={false}
            logicalDepth={logicalDepth + 1}
            visualDepth={visualDepth}
            head={false}
            tail={true}
            otherChild={false}
            key='firstChild'
            comment={firstChild}
          />
        ]
      }

      return [
        <More
          key='more'
          visualDepth={visualDepth}
          connected
          logicalDepth={logicalDepth + 1}
          comment={comment}
        />
      ]
    })()
  ]
}

Node.propTypes = {
  t: PropTypes.func.isRequired,
  displayAuthor: PropTypes.object,
  comment: PropTypes.object.isRequired,
  timeago: PropTypes.func.isRequired,
  onEditPreferences: PropTypes.func.isRequired,
  upvoteComment: PropTypes.func.isRequired,
  downvoteComment: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  More: PropTypes.func.isRequired,
}

export default Node
