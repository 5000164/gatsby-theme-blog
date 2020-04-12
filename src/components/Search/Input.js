import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import styled, { css } from "styled-components"
import { Search } from "styled-icons/fa-solid"

export default connectSearchBox(({ refine, ...rest }) => (
  <Form onSubmit={e => e.preventDefault()}>
    <SearchIcon {...rest} />
    <Input type="text" onChange={e => refine(e.target.value)} {...rest} />
  </Form>
))

const Form = styled.form`
  width: 200px;
`

const SearchIcon = styled(Search)`
  width: 2rem;
  padding: 0 0.5rem;
  ${() => blurredIcon}
`

const blurredIcon = css`
  color: hsl(235, 10%, 40%);
`

const Input = styled.input`
  font-size: 1rem;
  background: transparent;
  margin-left: -2rem;
  padding-left: 2rem;
  outline: none;
  border: none;
  transition: width 0.25s ease-out 0s;
  ${() => blurredText}
`

const blurredText = css`
  width: 150px;
  color: hsl(235, 10%, 40%);
  border-bottom: 1px solid hsl(235, 10%, 40%);
`
