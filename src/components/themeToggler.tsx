import { ThemeToggler as GatsbyThemeToggler } from 'gatsby-plugin-dark-mode';
import React from 'react';
import './themeToggler.css';

export const ThemeToggler = () => {
  return (
    <GatsbyThemeToggler>
      {({ theme, toggleTheme }: any) => {
        const handleToggle = (e: any) =>
          toggleTheme(e.target.checked ? 'dark' : 'light');

        const darkStyles =
          theme === 'dark'
            ? {
                borderColor: 'yellow',
                color: 'yellow',
              }
            : {};

        return (
          <label htmlFor="themeToggler">
            <input
              id="themeToggler"
              type="checkbox"
              onChange={handleToggle}
              checked={theme === 'dark'}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-50 -100 100 100"
              width="50"
              height="50"
              style={darkStyles}
            >
              <g className="flip" transform="scale(1 1)">
                <g className="rotate" transform="rotate(0)">
                  <g transform="translate(0 50)">
                    <g transform="scale(-1 1)">
                      <g className="rotate" transform="rotate(0)">
                        <g transform="scale(-1 1)">
                          <g className="flip" transform="scale(1 1)">
                            <g transform="scale(0.65) translate(-50 -50)">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="-50 -50 100 100"
                              >
                                <defs>
                                  <circle id="moon" r="28" />
                                  <mask id="mask-moon">
                                    <use href="#moon" fill="hsl(0, 0%, 100%)" />
                                    <use
                                      x="20"
                                      y="-20"
                                      href="#moon"
                                      fill="hsl(0, 0%, 0%)"
                                    />
                                  </mask>
                                </defs>
                                <g fill="currentColor">
                                  <use href="#moon" mask="url(#mask-moon)" />
                                </g>
                              </svg>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>

                  <g transform="translate(0 -50)">
                    <g transform="scale(-1 1)">
                      <g className="rotate" transform="rotate(0)">
                        <g transform="scale(0.65) translate(-50 -50)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-50 -50 100 100"
                          >
                            <defs>
                              <circle id="sun" r="22" />
                            </defs>
                            <g fill="currentColor">
                              <use href="#sun" />
                              <g id="rays">
                                <use
                                  href="#sun"
                                  transform="translate(0 41.2) scale(0.4)"
                                />
                                <use
                                  href="#sun"
                                  transform="rotate(45) translate(0 41.2) scale(0.4)"
                                />
                                <use
                                  href="#sun"
                                  transform="rotate(90) translate(0 41.2) scale(0.4)"
                                />
                                <use
                                  href="#sun"
                                  transform="rotate(135) translate(0 41.2) scale(0.4)"
                                />
                              </g>
                              <use href="#rays" transform="scale(-1 -1)" />
                            </g>
                          </svg>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </label>
        );
      }}
    </GatsbyThemeToggler>
  );
};
