import React from 'react';
import { useDispatch } from 'react-redux';

import Plugin from '../../containers/Plugin';
import { getPluginsByType, Type } from '../../plugins';
import { setBackground } from '../../store/actions/profile';
import { useSelector } from '../../store/store';
import { storage } from '../../store/selectors/storage';

const Background: React.FC = () => {
  const plugins = getPluginsByType(Type.BACKGROUND);
  const id = useSelector(state => state.profile.background.id);
  const { type } = useSelector(storage(id));

  const dispatch = useDispatch();
  const handleChangeBackground = React.useCallback(
    (type: string) => dispatch(setBackground(type)),
    [dispatch],
  );

  return (
    <div>
      <h3>Background</h3>

      <label>
        <select
          value={type}
          onChange={event => handleChangeBackground(event.target.value)}
          className="primary"
        >
          {plugins.map(plugin => (
            <option key={plugin.key} value={plugin.key}>
              {plugin.title}
            </option>
          ))}
        </select>
      </label>

      <Plugin id={id} display="settings" />
    </div>
  );
};

export default Background;
