import styles from '../styles'
import { colors } from '@themes'

describe('styles', () => {
  it('should have the correct linear-gradient string', () => {
    expect(styles.defaultLinearGradient('red', 'orange')).toBe(
      'linear-gradient(red, orange)'
    )
  })

  it('should have the correct box-shadow', () => {
    expect(
      styles
        .boxShadow(colors.transparent80)
        .styles.replace(/[\r\n\s]+/gm, '')
        .trim()
    ).toBe('box-shadow:rgba(0,0,0,0.2)2px2px;')
  })

  it('should apply boxShadow with all custom parameters', () => {
    const result = styles.boxShadow('4px', '4px', '8px', 'red')
    expect(result.styles).toContain('box-shadow')
  })

  it('should apply textShadow with default parameters', () => {
    const result = styles.textShadow()
    expect(result.styles).toContain('text-shadow')
  })

  it('should apply textShadow with custom parameters', () => {
    const result = styles.textShadow('1px', '1px', '3px', 'blue')
    expect(result.styles).toContain('text-shadow')
  })
})
