import React, { Component } from "react"
import algoliasearch from "algoliasearch/lite"
import { connectStateResults, Hits, Index, InstantSearch, SearchBox } from "react-instantsearch-dom"
import styled, { css } from "styled-components"
import { Algolia } from "styled-icons/fa-brands/Algolia"
import PostHit from "./PostHit"

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { query: "" }
  }

  render() {
    const index = "Posts"
    const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
    const StateResults = ({ searchState, searchResults }) => {
      const hasResults = searchResults && searchResults.nbHits !== 0
      return (
        <div>
          <div hidden={hasResults}>
            No results for <q>{searchState.query}</q>
          </div>
        </div>
      )
    }
    const CustomStateResults = connectStateResults(StateResults)

    return (
      <InstantSearch indexName={index} searchClient={searchClient}>
        <Root>
          <SearchBox
            onChange={e => this.setState({ query: e.target.value })}
            onReset={e => this.setState({ query: "" })}
          />
          <HitsWrapper show={this.state.query.length > 0}>
            <Index key={index} indexName={index}>
              <CustomStateResults />
              <Hits hitComponent={PostHit()} />
            </Index>
            <By>
              Powered by
              <a href="https://www.algolia.com">
                <StyledAlgolia />
                Algolia
              </a>
            </By>
          </HitsWrapper>
        </Root>
      </InstantSearch>
    )
  }
}

const Root = styled.div`
  position: relative;
`

const HitsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 0.5em);
  left: -200px;
  right: 0;
  visibility: ${props => (props.show ? "visible" : "hidden")};
  opacity: ${props => (props.show ? "1" : "0")};
  z-index: 1;
  width: 600px;
  max-height: 500px;
  margin: 0 auto;
  background-color: hsl(0, 100%, 100%);
  border-radius: 3px;
  border: 1px solid hsl(0, 0%, 95%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  transition: ${props =>
    props.show
      ? "visibility 0s ease-out 0s, opacity .25s ease-out 0s"
      : "visibility 0s ease-out .25s, opacity .25s ease-out 0s"};
  @media (max-width: 800px) {
    width: 75%;
  }
  ${() => hits}
`

const hits = css`
  ul {
    width: 600px;
    list-style: none;
    padding: 0;
  }
  @media (max-width: 800px) {
    ul {
      width: 75%;
    }
  }
`

const By = styled.div`
  font-size: 0.8em;
  text-align: right;
`

const StyledAlgolia = styled(props => <Algolia {...props} />)`
  width: calc(1em + 6px);
  padding: 0 2px 0 4px;
`
