const DEFAULT_TEMPLATE_CHILDREN = 10;

/**
 * Generates the supplied number of children templates.
 * @param {Object} resource The resource with `childrenTemplate` and `childrenCount`.
 * @returns {Array} An array of expanded child resources.
 */
function templateProcessor(resource) {
  const parsed = parseInt(resource.childrenCount, 10);
  const count = resource.childrenCount && !Number.isNaN(parsed)
    ? parsed
    : DEFAULT_TEMPLATE_CHILDREN;

  return [...Array(count).keys()].map(() => {
    const template = Object.assign({}, resource.childrenTemplate);
    return template;
  });
}

/**
 * @param {<Object>} resource a resource in context persona resource objects
 * @returns {<Object>} the resource templated per templateProcessor rules
 */
export default function expandTemplates(resource) {
  if (resource.childrenTemplate) {
    const transformedresource = {
      ...resource,
      children: templateProcessor(resource),
    };

    const {
      childrenCount, /* eslint-disable-line no-unused-vars */
      childrenTemplate, /* eslint-disable-line no-unused-vars */
      ...transformedresourceWithOmittedProps
    } = transformedresource;
    return transformedresourceWithOmittedProps;
  }
  return resource;
}
