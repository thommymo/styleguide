import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {css} from 'glamor'
import Textarea from 'react-textarea-autosize';
import colors from '../../theme/colors'
import {serifRegular16, sansSerifRegular16} from '../Typography/styles'
import MdClose from 'react-icons/lib/md/close'

import CommentComposerHeader from './CommentComposerHeader'
import CommentComposerError from './CommentComposerError'

const styles = {
  form: css({
    background: colors.secondaryBg,
    borderTop: '1px solid white'
  }),
  textArea: css({
    padding: '6px 12px 0',
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '60px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    ...serifRegular16,
    color: colors.text
  }),
  textAreaEmpty: css({
    color: colors.lightText,
    '::-webkit-input-placeholder': {
      color: colors.lightText
    }
  }),
  actions: css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '40px'
  }),
  cancelButton: css({
    outline: 'none',
    WebkitAppearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: '0 6px',
    cursor: 'pointer',

    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px'
  }),
  commitButton: css({
    outline: 'none',
    WebkitAppearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: '0 12px 0 6px',
    cursor: 'pointer',

    ...sansSerifRegular16,
    color: colors.primary,

    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center'
  })
}

class CommentComposer extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      text: props.initialText || ''
    }

    this.onChange = ev => {
      this.setState({text: ev.target.value})
    }

    this.onSubmit = () => {
      this.props.submitComment(this.state.text)
    }

    this.textarea = null
    this.textareaRef = (ref) => {
      this.textarea = ref
    }
  }

  componentDidMount () {
    if (this.textarea) {
      this.textarea.focus()
    }
  }

  render () {
    const {t, displayAuthor, error, onEditPreferences, onCancel, submitLabel} = this.props
    const {text} = this.state

    return (
      <div>
        <CommentComposerHeader
          {...displayAuthor}
          onClick={onEditPreferences}
        />

        <div {...styles.form}>
          <Textarea
            inputRef={this.textareaRef}
            {...styles.textArea}
            {...(text === '' ? styles.textAreaEmpty : {})}
            placeholder={t('styleguide/CommentComposer/placeholder')}
            value={text}
            rows='1'
            onChange={this.onChange}
          />

          <div {...styles.actions}>
            <button {...styles.cancelButton} onClick={onCancel}>
              <MdClose />
            </button>
            <button {...styles.commitButton} onClick={this.onSubmit}>
              {submitLabel || t('styleguide/CommentComposer/answer')}
            </button>
          </div>
        </div>
        {error && <CommentComposerError>{error}</CommentComposerError>}
      </div>
    )
  }
}

CommentComposer.propTypes = {
  t: PropTypes.func.isRequired,
  displayAuthor: PropTypes.object.isRequired,
  error: PropTypes.string,
  onEditPreferences: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  submitLabel: PropTypes.string
}

export default CommentComposer
