/**
 * @fileoverview Enforce a defaultProps definition for every prop that is not a required prop.
 * @author Vitor Balocco
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/require-default-props');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({parserOptions});

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

ruleTester.run('require-default-props', rule, {

  valid: [].concat(
    //
    // stateless components as function declarations
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string.isRequired,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n')
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'MyStatelessComponent.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n')
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  bar: PropTypes.string.isRequired',
        '};',
        'MyStatelessComponent.propTypes.foo = PropTypes.string;',
        'MyStatelessComponent.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  bar: PropTypes.string.isRequired',
        '};',
        'MyStatelessComponent.propTypes.foo = PropTypes.string;',
        'MyStatelessComponent.defaultProps = {};',
        'MyStatelessComponent.defaultProps.foo = "foo";'
      ].join('\n')
    },
    {
      code: [
        'function MyStatelessComponent({ foo }) {',
        '  return <div>{foo}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {};',
        'MyStatelessComponent.propTypes.foo = PropTypes.string;',
        'MyStatelessComponent.defaultProps = {};',
        'MyStatelessComponent.defaultProps.foo = "foo";'
      ].join('\n')
    },
    {
      code: [
        'const types = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = types;',
        'MyStatelessComponent.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'const defaults = {',
        '  foo: "foo"',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'MyStatelessComponent.defaultProps = defaults;'
      ].join('\n')
    },
    {
      code: [
        'const defaults = {',
        '  foo: "foo"',
        '};',
        'const types = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = types;',
        'MyStatelessComponent.defaultProps = defaults;'
      ].join('\n')
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}]
    },
    {
      code: [
        'function MyStatelessComponent({ foo = "test", bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}]
    },
    {
      code: [
        'function MyStatelessComponent({ foo = "test", bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '};'
      ].join('\n'),
      options: [{forbidDefaultForRequired: true, ignoreFunctionalComponents: true}]
    },
    {
      code: [
        'export function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'export function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.TYPESCRIPT_ESLINT
    },
    {
      code: [
        'export default function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'export default function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.TYPESCRIPT_ESLINT
    },

    //
    // stateless components as function expressions
    {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        const MyComponent = function({ foo, bar }) {
          return <div>{foo}{bar}</div>;
        };

        MyComponent.propTypes = {
          foo: PropTypes.string,
          bar: PropTypes.string.isRequired
        };

        export default MyComponent;
      `,
      options: [{ignoreFunctionalComponents: true}]
    },
    {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        export const MyComponent = function({ foo, bar }) {
          return <div>{foo}{bar}</div>;
        };

        MyComponent.propTypes = {
          foo: PropTypes.string,
          bar: PropTypes.string.isRequired
        };
      `,
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.BABEL_ESLINT
    },
    {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        export const MyComponent = function({ foo, bar }) {
          return <div>{foo}{bar}</div>;
        };

        MyComponent.propTypes = {
          foo: PropTypes.string,
          bar: PropTypes.string.isRequired
        };
      `,
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.TYPESCRIPT_ESLINT
    },

    //
    // stateless components as arrow function expressions
    {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        const MyComponent = ({ foo, bar }) => {
          return <div>{foo}{bar}</div>;
        };

        MyComponent.propTypes = {
          foo: PropTypes.string,
          bar: PropTypes.string.isRequired
        };

        export default MyComponent;
      `,
      options: [{ignoreFunctionalComponents: true}]
    },
    {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        export const MyComponent = ({ foo, bar }) => {
          return <div>{foo}{bar}</div>;
        };

        MyComponent.propTypes = {
          foo: PropTypes.string,
          bar: PropTypes.string.isRequired
        };

        export default MyComponent;
      `,
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.BABEL_ESLINT
    },
    {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        export const MyComponent = ({ foo, bar }) => {
          return <div>{foo}{bar}</div>;
        };

        MyComponent.propTypes = {
          foo: PropTypes.string,
          bar: PropTypes.string.isRequired
        };

        export default MyComponent;
      `,
      options: [{ignoreFunctionalComponents: true}],
      parser: parsers.TYPESCRIPT_ESLINT
    },

    //
    // createReactClass components
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string.isRequired,',
        '    bar: PropTypes.string.isRequired',
        '  }',
        '});'
      ].join('\n')
    },
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string.isRequired',
        '  },',
        '  getDefaultProps: function() {',
        '    return {',
        '      foo: "foo"',
        '    };',
        '  }',
        '});'
      ].join('\n')
    },
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string',
        '  },',
        '  getDefaultProps: function() {',
        '    return {',
        '      foo: "foo",',
        '      bar: "bar"',
        '    };',
        '  }',
        '});'
      ].join('\n')
    },
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  }',
        '});'
      ].join('\n')
    },
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string',
        '  },',
        '  getDefaultProps: function() {',
        '    return {',
        '      foo: "foo",',
        '      bar: "bar"',
        '    };',
        '  }',
        '});'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}]
    },

    //
    // ES6 class component
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string.isRequired,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.propTypes.foo = PropTypes.string;',
        'Greeting.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.propTypes.foo = PropTypes.string;',
        'Greeting.defaultProps = {};',
        'Greeting.defaultProps.foo = "foo";'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {};',
        'Greeting.propTypes.foo = PropTypes.string;',
        'Greeting.defaultProps = {};',
        'Greeting.defaultProps.foo = "foo";'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}]
    },

    //
    // edge cases

    // not a react component
    {
      code: [
        'function NotAComponent({ foo, bar }) {}',
        'NotAComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n')
    },
    {
      code: [
        'class Greeting {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n')
    },
    // external references
    {
      code: [
        'const defaults = require("./defaults");',
        'const types = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = types;',
        'MyStatelessComponent.defaultProps = defaults;'
      ].join('\n')
    },
    {
      code: [
        'const defaults = {',
        '  foo: "foo"',
        '};',
        'const types = require("./propTypes");',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = types;',
        'MyStatelessComponent.defaultProps = defaults;'
      ].join('\n')
    },
    {
      code: [
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = require("./defaults").foo;',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n')
    },
    {
      code: [
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = require("./defaults").foo;',
        'MyStatelessComponent.defaultProps.bar = "bar";',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n')
    },
    {
      code: [
        'import defaults from "./defaults";',

        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = defaults;',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: [
        'import { foo } from "./defaults";',

        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = foo;',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    // using spread operator
    {
      code: [
        'const component = rowsOfType(GuestlistEntry, (rowData, ownProps) => ({',
        '    ...rowData,',
        '    onPress: () => ownProps.onPress(rowData.id),',
        '}));'
      ].join('\n')
    },
    {
      code: [
        'MyStatelessComponent.propTypes = {',
        '  ...stuff,',
        '  foo: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = {',
        ' foo: "foo"',
        '};',
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n')
    },
    {
      code: [
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = {',
        ' ...defaults,',
        '};',
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  ...someProps,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.defaultProps = {',
        '  ...defaults,',
        '  bar: "bar"',
        '};'
      ].join('\n')
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.defaultProps = {',
        '  ...defaults,',
        '  bar: "bar"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },

    //
    // with Flow annotations
    {
      code: [
        'type Props = {',
        '  foo: string',
        '};',

        'class Hello extends React.Component {',
        '  props: Props;',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'type Props = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'class Hello extends React.Component {',
        '  props: Props;',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',

        'Hello.defaultProps = {',
        '  bar: "bar"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo: string,',
        '    bar?: string',
        '  };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',

        'Hello.defaultProps = {',
        '  bar: "bar"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo: string',
        '  };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'function Hello(props: { foo?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '}',

        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'function Hello(props: { foo: string }) {',
        '  return <div>Hello {foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'const Hello = (props: { foo?: string }) => {',
        '  return <div>Hello {props.foo}</div>;',
        '};',

        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'const Hello = (props: { foo: string }) => {',
        '  return <div>Hello {foo}</div>;',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'const Hello = function(props: { foo?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '};',

        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'const Hello = function(props: { foo: string }) {',
        '  return <div>Hello {foo}</div>;',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'type Props = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'type Props2 = {',
        '  foo: string,',
        '  baz?: string',
        '}',

        'function Hello(props: Props | Props2) {',
        '  return <div>Hello {props.foo}</div>;',
        '}',

        'Hello.defaultProps = {',
        '  bar: "bar",',
        '  baz: "baz"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'import type Props from "fake";',
        'class Hello extends React.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'type Props = any;',

        'const Hello = function({ foo }: Props) {',
        '  return <div>Hello {foo}</div>;',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'import type ImportedProps from "fake";',
        'type Props = ImportedProps;',
        'function Hello(props: Props) {',
        '  return <div>Hello {props.name.firstname}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    // don't error when variable is not in scope
    {
      code: [
        'import type { ImportedType } from "fake";',
        'type Props = ImportedType;',
        'function Hello(props: Props) {',
        '  return <div>Hello {props.name.firstname}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    // make sure error is not thrown with multiple assignments
    {
      code: [
        'import type ImportedProps from "fake";',
        'type NestedProps = ImportedProps;',
        'type Props = NestedProps;',
        'function Hello(props: Props) {',
        '  return <div>Hello {props.name.firstname}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    // make sure defaultProps are correctly detected with quoted properties
    {
      code: [
        'function Hello(props) {',
        '  return <div>Hello {props.bar}</div>;',
        '}',
        'Hello.propTypes = {',
        '  bar: PropTypes.string',
        '};',
        'Hello.defaultProps = {',
        '  "bar": "bar"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static propTypes = {',
        '    foo: PropTypes.string.isRequired',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{forbidDefaultForRequired: true}]
    },
    // test support for React PropTypes as Component's class generic
    {
      code: [
        'type HelloProps = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'class Hello extends React.Component<HelloProps> {',
        '  static defaultProps = {',
        '    bar: "bar"',
        '  }',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{forbidDefaultForRequired: true}]
    },
    {
      code: [
        'type HelloProps = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'class Hello extends Component<HelloProps> {',
        '  static defaultProps = {',
        '    bar: "bar"',
        '  }',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{forbidDefaultForRequired: true}]
    },
    {
      code: [
        'type HelloProps = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'type HelloState = {',
        '  dummyState: string',
        '};',

        'class Hello extends Component<HelloProps, HelloState> {',
        '  static defaultProps = {',
        '    bar: "bar"',
        '  }',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{forbidDefaultForRequired: true}]
    },
    {
      code: [
        'type HelloProps = {',
        '  foo?: string,',
        '  bar?: string',
        '};',

        'class Hello extends Component<HelloProps> {',
        '  static defaultProps = {',
        '    foo: "foo",',
        '    bar: "bar"',
        '  }',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{forbidDefaultForRequired: true}]
    }, {
      code: `
        type Props = {
          +name?: string,
        };
        function Hello(props: Props) {
          return <div>Hello {props.name}</div>;
        }
        Hello.defaultProps = {
          name: 'foo'
        };
      `,
      parser: parsers.BABEL_ESLINT
    },
    parsers.TS([{
      code: `
        import React from "react";

        interface Props {
          name: string;
        }
        
        const MyComponent: React.FC<Props> = ({ name }) => {
          return <div>{name}</div>;
        };
        
        export default MyComponent;
      `,
      parser: parsers.TYPESCRIPT_ESLINT
    }, {
      code: `
        import React from "react";

        interface Props {
          name: string;
        }
        
        const MyComponent: React.FC<Props> = ({ name }) => {
          return <div>{name}</div>;
        };
        
        export default MyComponent;
      `,
      parser: parsers['@TYPESCRIPT_ESLINT']
    }])
  ),

  invalid: [
    //
    // stateless components
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 5,
        column: 3
      }]
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = forbidExtraProps({',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '});'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 5,
        column: 3
      }],
      settings: {
        propWrapperFunctions: ['forbidExtraProps']
      }
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'const propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'MyStatelessComponent.propTypes = forbidExtraProps(propTypes);'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 5,
        column: 3
      }],
      settings: {
        propWrapperFunctions: ['forbidExtraProps']
      }
    },
    {
      code: [
        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'MyStatelessComponent.propTypes.baz = React.propTypes.string;'
      ].join('\n'),
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'foo'},
          line: 5,
          column: 3
        },
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'baz'},
          line: 8,
          column: 1
        }
      ]
    },
    {
      code: [
        'const types = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = types;'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 2,
        column: 3
      }]
    },
    {
      code: [
        'const defaults = {',
        '  foo: "foo"',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string',
        '};',
        'MyStatelessComponent.defaultProps = defaults;'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 9,
        column: 3
      }]
    },
    {
      code: [
        'const defaults = {',
        '  foo: "foo"',
        '};',
        'const types = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string',
        '};',

        'function MyStatelessComponent({ foo, bar }) {',
        '  return <div>{foo}{bar}</div>;',
        '}',
        'MyStatelessComponent.propTypes = types;',
        'MyStatelessComponent.defaultProps = defaults;'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 6,
        column: 3
      }]
    },

    //
    // createReactClass components
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string.isRequired',
        '  }',
        '});'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 6,
        column: 5
      }]
    },
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string.isRequired',
        '  }',
        '});'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 6,
        column: 5
      }]
    },
    {
      code: [
        'var Greeting = createReactClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.foo} {this.props.bar}</div>;',
        '  },',
        '  propTypes: {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string',
        '  },',
        '  getDefaultProps: function() {',
        '    return {',
        '      foo: "foo"',
        '    };',
        '  }',
        '});'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 7,
        column: 5
      }]
    },

    //
    // ES6 class component
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 9,
        column: 3
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 9,
        column: 3
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string',
        '};',
        'Greeting.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 10,
        column: 3
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.propTypes.foo = PropTypes.string;'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 11,
        column: 1
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {',
        '  bar: PropTypes.string',
        '};',
        'Greeting.propTypes.foo = PropTypes.string;',
        'Greeting.defaultProps = {};',
        'Greeting.defaultProps.foo = "foo";'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 9,
        column: 3
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'Greeting.propTypes = {};',
        'Greeting.propTypes.foo = PropTypes.string;',
        'Greeting.defaultProps = {};',
        'Greeting.defaultProps.bar = "bar";'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 9,
        column: 1
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'const props = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'Greeting.propTypes = props;'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 9,
        column: 3
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '}',
        'const props = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string',
        '};',
        'const defaults = {',
        '  foo: "foo"',
        '};',
        'Greeting.propTypes = props;',
        'Greeting.defaultProps = defaults;'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 10,
        column: 3
      }]
    },

    //
    // ES6 classes with static getter methods
    {
      code: [
        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return {',
        '      name: PropTypes.string',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'name'},
        line: 4,
        column: 7
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return {',
        '      name: PropTypes.string',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      options: [{ignoreFunctionalComponents: true}],
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'name'},
        line: 4,
        column: 7
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return {',
        '      foo: PropTypes.string,',
        '      bar: PropTypes.string',
        '    };',
        '  }',
        '  static get defaultProps() {',
        '    return {',
        '      bar: "world"',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 4,
        column: 7
      }]
    },
    {
      code: [
        'const props = {',
        '  foo: PropTypes.string',
        '};',

        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return props;',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 2,
        column: 3
      }]
    },
    {
      code: [
        'const defaults = {',
        '  bar: "world"',
        '};',

        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return {',
        '      foo: PropTypes.string,',
        '      bar: PropTypes.string',
        '    };',
        '  }',
        '  static get defaultProps() {',
        '    return defaults;',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 7,
        column: 7
      }]
    },

    //
    // ES6 classes with property initializers
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '  static propTypes = {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string.isRequired',
        '  };',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 8,
        column: 5
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '  static propTypes = {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string.isRequired',
        '  };',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{ignoreFunctionalComponents: true}],
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 8,
        column: 5
      }]
    },
    {
      code: [
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '  static propTypes = {',
        '    foo: PropTypes.string,',
        '    bar: PropTypes.string',
        '  };',
        '  static defaultProps = {',
        '    foo: "foo"',
        '  };',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 9,
        column: 5
      }]
    },
    {
      code: [
        'const props = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string.isRequired',
        '};',
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '  static propTypes = props;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 2,
        column: 3
      }]
    },
    {
      code: [
        'const props = {',
        '  foo: PropTypes.string,',
        '  bar: PropTypes.string',
        '};',
        'const defaults = {',
        '  foo: "foo"',
        '};',
        'class Greeting extends React.Component {',
        '  render() {',
        '    return (',
        '      <h1>Hello, {this.props.foo} {this.props.bar}</h1>',
        '    );',
        '  }',
        '  static propTypes = props;',
        '  static defaultProps = defaults;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 3,
        column: 3
      }]
    },

    //
    // edge cases
    {
      code: [
        'let Greetings = {};',
        'Greetings.Hello = class extends React.Component {',
        '  render () {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',
        'Greetings.Hello.propTypes = {',
        '  foo: PropTypes.string',
        '};'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 8,
        column: 3
      }]
    },
    {
      code: [
        'var Greetings = ({ foo = "foo" }) => {',
        '  return <div>Hello {this.props.foo}</div>;',
        '}',
        'Greetings.propTypes = {',
        '  foo: PropTypes.string',
        '};'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 5,
        column: 3
      }]
    },

    // component with no declared props followed by a failing component
    {
      code: [
        'var ComponentWithNoProps = ({ bar = "bar" }) => {',
        '  return <div>Hello {this.props.foo}</div>;',
        '}',
        'var Greetings = ({ foo = "foo" }) => {',
        '  return <div>Hello {this.props.foo}</div>;',
        '}',
        'Greetings.propTypes = {',
        '  foo: PropTypes.string',
        '};'
      ].join('\n'),
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 8,
        column: 3
      }]
    },
    //
    // with Flow annotations
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo?: string,',
        '    bar?: string',
        '  };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',

        'Hello.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 4,
        column: 5
      }]
    },
    {
      code: [
        'type Props = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'class Hello extends React.Component {',
        '  props: Props;',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 3,
        column: 3
      }]
    },
    {
      code: [
        'type Props = {',
        '  foo?: string',
        '};',

        'class Hello extends React.Component {',
        '  props: Props;',

        '  static defaultProps: { foo: string };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 2,
        column: 3
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo: string,',
        '    bar?: string',
        '  };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 4,
        column: 5
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo?: string,',
        '    bar?: string',
        '  };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'foo'},
          line: 3,
          column: 5
        },
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'bar'},
          line: 4,
          column: 5
        }
      ]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo?: string',
        '  };',

        '  static defaultProps: { foo: string };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 3,
        column: 5
      }]
    },
    {
      code: [
        'type Props = {',
        '  foo?: string,',
        '  bar?: string',
        '};',

        'class Hello extends React.Component {',
        '  props: Props;',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',

        'Hello.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 3,
        column: 3
      }]
    },
    {
      code: [
        'type Props = {',
        '  foo?: string,',
        '  bar?: string',
        '};',

        'class Hello extends React.Component {',
        '  props: Props;',

        '  static defaultProps: { foo: string, bar: string };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',

        'Hello.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 3,
        column: 3
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  props: {',
        '    foo?: string,',
        '    bar?: string',
        '  };',

        '  static defaultProps: { foo: string, bar: string };',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',

        'Hello.defaultProps = {',
        '  foo: "foo"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 4,
        column: 5
      }]
    },
    {
      code: [
        'function Hello(props: { foo?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 1,
        column: 25
      }]
    },
    {
      code: [
        'function Hello({ foo = "foo" }: { foo?: string }) {',
        '  return <div>Hello {foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 1,
        column: 35
      }]
    },
    {
      code: [
        'function Hello(props: { foo?: string, bar?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '}',
        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 1,
        column: 39
      }]
    },
    {
      code: [
        'function Hello(props: { foo?: string, bar?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'foo'},
          line: 1,
          column: 25
        },
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'bar'},
          line: 1,
          column: 39
        }
      ]
    },
    {
      code: [
        'type Props = {',
        '  foo?: string',
        '};',

        'function Hello(props: Props) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 2,
        column: 3
      }]
    },
    {
      code: [
        'const Hello = (props: { foo?: string }) => {',
        '  return <div>Hello {props.foo}</div>;',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 1,
        column: 25
      }]
    },
    {
      code: [
        'const Hello = (props: { foo?: string, bar?: string }) => {',
        '  return <div>Hello {props.foo}</div>;',
        '};',
        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 1,
        column: 39
      }]
    },
    {
      code: [
        'const Hello = function(props: { foo?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'},
        line: 1,
        column: 33
      }]
    },
    {
      code: [
        'const Hello = function(props: { foo?: string, bar?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '};',
        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 1,
        column: 47
      }]
    },
    {
      code: [
        'type Props = {',
        '  foo?: string,',
        '  bar?: string',
        '};',

        'function Hello(props: Props) {',
        '  return <div>Hello {props.foo}</div>;',
        '}',
        'Hello.defaultProps = { foo: "foo" };'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'},
        line: 3,
        column: 3
      }]
    },

    // UnionType
    {
      code: [
        'function Hello(props: { one?: string } | { two?: string }) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'one'},
          line: 1,
          column: 25
        },
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'two'},
          line: 1,
          column: 44
        }
      ]
    },
    {
      code: [
        'type Props = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'type Props2 = {',
        '  foo: string,',
        '  baz?: string',
        '}',

        'function Hello(props: Props | Props2) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'bar'},
          line: 3,
          column: 3
        },
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'baz'},
          line: 7,
          column: 3
        }
      ]
    },
    {
      code: [
        'type Props = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'type Props2 = {',
        '  foo: string,',
        '  baz?: string',
        '}',

        'function Hello(props: Props | Props2) {',
        '  return <div>Hello {props.foo}</div>;',
        '}',

        'Hello.defaultProps = {',
        '  bar: "bar"',
        '};'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'baz'},
          line: 7,
          column: 3
        }
      ]
    },
    {
      code: [
        'type HelloProps = {',
        '  two?: string,',
        '  three: string',
        '};',
        'function Hello(props: { one?: string } | HelloProps) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'two'},
          line: 2,
          column: 3
        },
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'one'},
          line: 5,
          column: 25
        }
      ]
    },
    {
      code: [
        'type HelloProps = {',
        '  two?: string,',
        '  three: string',
        '};',
        'function Hello(props: ExternalProps | HelloProps) {',
        '  return <div>Hello {props.foo}</div>;',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'two'},
          line: 2,
          column: 3
        }
      ]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static propTypes = {',
        '    foo: PropTypes.string',
        '  };',
        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [
        {
          messageId: 'shouldHaveDefault',
          data: {name: 'foo'},
          line: 3,
          column: 5
        }
      ]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return {',
        '      name: PropTypes.string',
        '    };',
        '  }',
        '  static defaultProps() {',
        '    return {',
        '      name: \'John\'',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'name'}
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static get propTypes() {',
        '    return {',
        '      \'first-name\': PropTypes.string',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props[\'first-name\']}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'first-name'}
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  foo: PropTypes.string.isRequired',
        '};',
        'Hello.defaultProps = {',
        '  foo: \'bar\'',
        '};'
      ].join('\n'),
      options: [{forbidDefaultForRequired: true}],
      errors: [{
        messageId: 'noDefaultWithRequired',
        data: {name: 'foo'}
      }]
    },
    {
      code: [
        'function Hello(props) {',
        '  return <div>Hello {props.foo}</div>;',
        '}',
        'Hello.propTypes = {',
        '  foo: PropTypes.string.isRequired',
        '};',
        'Hello.defaultProps = {',
        '  foo: \'bar\'',
        '};'
      ].join('\n'),
      options: [{forbidDefaultForRequired: true}],
      errors: [{
        messageId: 'noDefaultWithRequired',
        data: {name: 'foo'}
      }]
    },
    {
      code: [
        'const Hello = (props) => {',
        '  return <div>Hello {props.foo}</div>;',
        '};',
        'Hello.propTypes = {',
        '  foo: PropTypes.string.isRequired',
        '};',
        'Hello.defaultProps = {',
        '  foo: \'bar\'',
        '};'
      ].join('\n'),
      options: [{forbidDefaultForRequired: true}],
      errors: [{
        messageId: 'noDefaultWithRequired',
        data: {name: 'foo'}
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static propTypes = {',
        '    foo: PropTypes.string.isRequired',
        '  }',
        '  static defaultProps = {',
        '    foo: \'bar\'',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      options: [{forbidDefaultForRequired: true}],
      errors: [{
        messageId: 'noDefaultWithRequired',
        data: {name: 'foo'}
      }]
    },
    {
      code: [
        'class Hello extends React.Component {',
        '  static get propTypes () {',
        '    return {',
        '      foo: PropTypes.string.isRequired',
        '    };',
        '  }',
        '  static get defaultProps() {',
        '    return {',
        '      foo: \'bar\'',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      options: [{forbidDefaultForRequired: true}],
      errors: [{
        messageId: 'noDefaultWithRequired',
        data: {name: 'foo'}
      }]
    },
    // test support for React PropTypes as Component's class generic
    {
      code: [
        'type HelloProps = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'class Hello extends React.Component<HelloProps> {',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'}
      }]
    },
    {
      code: [
        'type HelloProps = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'class Hello extends Component<HelloProps> {',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'}
      }]
    },
    {
      code: [
        'type HelloProps = {',
        '  foo: string,',
        '  bar?: string',
        '};',

        'type HelloState = {',
        '  dummyState: string',
        '};',

        'class Hello extends Component<HelloProps, HelloState> {',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'}
      }]
    },
    {
      code: [
        'type HelloProps = {',
        '  foo?: string,',
        '  bar?: string',
        '};',

        'class Hello extends Component<HelloProps> {',

        '  render() {',
        '    return <div>Hello {this.props.foo}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'foo'}
      }, {
        messageId: 'shouldHaveDefault',
        data: {name: 'bar'}
      }]
    },
    {
      code: `
        type Props = {
          +name?: string,
        };
        function Hello(props: Props) {
          return <div>Hello {props.name}</div>;
        }
      `,
      parser: parsers.BABEL_ESLINT,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'name'}
      }]
    }, {
      code: `
        import PropTypes from 'prop-types';
        import React from 'react';

        const MyComponent= (props) => {
          switch (props.usedProp) {
            case 1:
              return (<div />);
            default:
              return <div />;
          }
        };

        MyComponent.propTypes = {
          usedProp: PropTypes.string,
        };

        export default MyComponent;
      `,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'usedProp'}
      }]
    },
    {
      code: `
        Foo.propTypes = {
          a: PropTypes.string,
        }

        export default function Foo(props) {
          return <p>{props.a}</p>
        };
      `,
      errors: [{
        messageId: 'shouldHaveDefault',
        data: {name: 'a'}
      }]
    }
  ]
});
