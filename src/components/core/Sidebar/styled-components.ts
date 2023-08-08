/**
 * @license
 * Copyright 2018-2022 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { transparentize } from "color2k"

export const StyledSidebar = styled.section(({ theme }) => ({
  [`@media (max-width: ${theme.breakpoints.md})`]: {
    marginLeft: theme.spacing.none,
    // Instead of 100% width and height, we want to make sure
    // the sidebar takes all available space when viewports change
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}))

export const StyledSidebarNavContainer = styled.div(({ theme }) => ({
  position: "relative",
}))

export interface StyledSidebarNavItemsProps {
  isExpanded: boolean
  isOverflowing: boolean
  hasSidebarElements: boolean
}

export const StyledSidebarNavItems = styled.ul<StyledSidebarNavItemsProps>(
  ({ isExpanded, isOverflowing, hasSidebarElements, theme }) => {
    const isExpandedMaxHeight = isExpanded ? "75vh" : "33vh"
    const maxHeight = hasSidebarElements ? isExpandedMaxHeight : "100vh"

    return {
      maxHeight,
      listStyle: "none",
      overflow: ["auto", "overlay"],
      margin: 0,
      paddingTop: theme.sizes.sidebarTopSpace,
      paddingBottom: theme.spacing.lg,

      "&::before": isOverflowing
        ? {
            content: '" "',
            backgroundImage: `linear-gradient(0deg, transparent, ${theme.colors.bgColor})`,
            width: "100%",
            height: "2rem",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
          }
        : null,

      "&::after": isOverflowing
        ? {
            content: '" "',
            backgroundImage: `linear-gradient(0deg, ${theme.colors.bgColor}, transparent)`,
            height: "2rem",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
          }
        : null,
    }
  }
)

export interface StyledSidebarNavSeparatorContainerProps {
  isExpanded: boolean
  isOverflowing: boolean
}

const bounceAnimation = keyframes`
  from, to {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.25rem);
  }
`

export const StyledSidebarNavSeparatorContainer = styled.div<
  StyledSidebarNavSeparatorContainerProps
>(({ isExpanded, isOverflowing, theme }) => ({
  cursor: isExpanded || isOverflowing ? "pointer" : "default",
  position: "absolute",
  height: theme.spacing.lg,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.fadedText60,
  borderBottom: `1px solid ${theme.colors.fadedText10}`,
  transition: "color 500ms",

  ...((isExpanded || isOverflowing) && {
    "&:hover": {
      color: theme.colors.bodyText,
      background: `linear-gradient(0deg, ${theme.colors.darkenedBgMix15}, transparent)`,

      "& > *": {
        animation: `${bounceAnimation} 0.5s ease infinite`,
      },
    },
  }),
}))

export const StyledSidebarNavLinkContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}))

export interface StyledSidebarNavLinkProps {
  isActive: boolean
}

export const StyledSidebarNavLink = styled.a<StyledSidebarNavLinkProps>(
  ({ isActive, theme }) => {
    const defaultPageLinkStyles = {
      textDecoration: "none",
      color: theme.colors.bodyText,
      fontWeight: isActive ? 600 : 400,
    }

    return {
      ...defaultPageLinkStyles,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,

      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.lg,
      lineHeight: theme.lineHeights.menuItem,

      backgroundColor: isActive ? theme.colors.darkenedBgMix15 : "transparent",

      "&:hover": {
        backgroundColor: isActive
          ? theme.colors.darkenedBgMix25
          : theme.colors.darkenedBgMix15,
      },

      "&:active,&:visited,&:hover": {
        ...defaultPageLinkStyles,
      },

      "&:focus": {
        outline: "none",
      },

      "&:focus-visible": {
        backgroundColor: theme.colors.darkenedBgMix15,
      },
    }
  }
)

export interface StyledSidebarContentProps {
  isCollapsed: boolean
  hideScrollbar: boolean
}

export const StyledSidebarContent = styled.div<StyledSidebarContentProps>(
  ({ isCollapsed, hideScrollbar, theme }) => ({
    backgroundColor: theme.colors.bgColor,
    backgroundAttachment: "fixed",
    flexShrink: 0,
    // Nudge the sidebar by 2px so the header decoration doesn't go below it
    height: "calc(100vh - 2px)",
    top: "2px",
    overflow: hideScrollbar ? "hidden" : ["auto", "overlay"],
    position: "relative",
    transition: "margin-left 300ms, box-shadow 300ms",
    width: theme.sizes.sidebar,
    zIndex: theme.zIndices.header + 1,
    marginLeft: isCollapsed ? `-${theme.sizes.sidebar}` : theme.spacing.none,

    "&:focus": {
      outline: "none",
    },

    [`@media (max-width: ${theme.breakpoints.md})`]: {
      boxShadow: `-2rem 0 2rem 2rem ${
        isCollapsed ? "transparent" : "#00000029"
      }`,
      zIndex: theme.zIndices.sidebarMobile,
    },
  })
)

export interface StyledSidebarUserContentProps {
  hasPageNavAbove: boolean
}

export const StyledSidebarUserContent = styled.div<
  StyledSidebarUserContentProps
>(({ hasPageNavAbove, theme }) => ({
  paddingTop: hasPageNavAbove ? theme.spacing.lg : theme.sizes.sidebarTopSpace,
  paddingLeft: theme.spacing.lg,
  paddingRight: theme.spacing.lg,

  "& h1": {
    fontSize: theme.fontSizes.xl,
    fontWeight: 600,
  },

  "& h2": {
    fontSize: theme.fontSizes.lg,
    fontWeight: 600,
  },

  "& h3": {
    fontSize: theme.fontSizes.mdLg,
    fontWeight: 600,
  },

  "& h4": {
    fontSize: theme.fontSizes.md,
    fontWeight: 600,
  },

  "& h5": {
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,
  },

  "& h6": {
    fontSize: theme.fontSizes.twoSm,
    fontWeight: 600,
  },
}))

export const StyledSidebarCloseButton = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.xs,
  right: theme.spacing.twoXS,
  zIndex: 1,

  "&:hover button": {
    backgroundColor: transparentize(theme.colors.fadedText60, 0.5),
  },
}))

export interface StyledSidebarCollapsedControlProps {
  chevronDownshift: number
  isCollapsed: boolean
}
export const StyledSidebarCollapsedControl = styled.div<
  StyledSidebarCollapsedControlProps
>(({ chevronDownshift, isCollapsed, theme }) => ({
  position: "fixed",
  top: chevronDownshift ? `${chevronDownshift}px` : theme.spacing.sm,
  left: isCollapsed ? theme.spacing.twoXS : `-${theme.spacing.twoXS}`,
  zIndex: theme.zIndices.header,

  transition: "left 300ms",
  transitionDelay: "left 300ms",

  color: theme.colors.bodyText,

  [`@media (max-width: ${theme.breakpoints.md})`]: {
    color: theme.colors.bodyText,
  },
}))
